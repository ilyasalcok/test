import { GoogleGenAI } from "@google/genai";
import { AnalysisResult, ContentResult, Source } from '../types';
import { FRAMEWORK_RULES } from './frameworkData';

if (!process.env.API_KEY) {
  throw new Error("API Anahtarı bulunamadı (process.env.API_KEY).");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// AŞAMA 1: Analiz ve Strateji (JSON Çıktısı)
export const performAnalysis = async (topic: string): Promise<AnalysisResult> => {
  const modelId = 'gemini-2.5-flash';

  const prompt = `
    Konu: "${topic}"

    GÖREV:
    Bu konu hakkında derinlemesine bir SEO analizi yap. Google Search aracını kullanarak gerçek verileri topla.
    
    Aşağıdaki 3 ana bölümü içeren SAF BİR JSON çıktısı üret. Başka hiçbir metin, markdown formatı veya açıklama ekleme. Sadece ve sadece geçerli JSON string döndür.

    BEKLENEN JSON FORMATI:
    {
      "strategy": {
        "intent": "Arama niyeti",
        "paa": ["Soru 1", "Soru 2"],
        "relatedQueries": ["Sorgu 1", "Sorgu 2"],
        "demographics": "Hedef kitle analizi",
        "summary": "Stratejik özet"
      },
      "gapAnalysis": {
        "competitorAnalysis": "Rakip durumu",
        "gaps": ["Eksik konu 1", "Eksik konu 2"],
        "opportunities": "Fırsatlar"
      },
      "outline": {
        "headingHierarchy": "Markdown listesi formatında başlık hiyerarşisi",
        "faqTopics": ["FAQ 1", "FAQ 2"],
        "ctaSuggestion": "CTA Önerisi"
      }
    }

    ANALİZ DETAYLARI:
    1. STRATEJİ (strategy):
       - Arama niyeti (intent)
       - Kullanıcılar bunu da sordu (PAA) soruları
       - İlgili aramalar (Related Queries)
       - Hedef kitle demografisi ve persona önerisi
       - Özet stratejik değerlendirme

    2. RAKİP VE GAP ANALİZİ (gapAnalysis):
       - İlk sayfadaki rakiplerin genel durumu
       - Rakiplerin EKSİK bıraktığı konular (Content Gaps)
       - Bizim için fırsat alanları

    3. OUTLINE (outline):
       - H1, H2, H3 hiyerarşisi (Markdown listesi formatında string olarak)
       - FAQ için belirlenen 5 soru
       - CTA (Eylem Çağrısı) önerisi
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // CRITICAL: responseMimeType ve responseSchema KULLANILMAMALIDIR.
        // Google Search tool'u aktifken modelin JSON şemasına uyması desteklenmez.
        // Bu yüzden prompt ile JSON istiyoruz ve aşağıda manuel parse ediyoruz.
      },
    });

    // Google Search Grounding Kaynaklarını Çıkar
    const sources: Source[] = [];
    if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
      response.candidates[0].groundingMetadata.groundingChunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title || "Kaynak",
            url: chunk.web.uri
          });
        }
      });
    }

    let jsonText = response.text;
    if (!jsonText) throw new Error("Analiz sonucu boş döndü.");
    
    // Markdown code block temizliği (```json ... ```)
    jsonText = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();

    // JSON objesini bulmak için ilk { ve son } arasını al
    const firstOpen = jsonText.indexOf('{');
    const lastClose = jsonText.lastIndexOf('}');
    
    if (firstOpen !== -1 && lastClose !== -1) {
      jsonText = jsonText.substring(firstOpen, lastClose + 1);
    }
    
    const analysisResult = JSON.parse(jsonText) as AnalysisResult;
    
    // Kaynakları sonuca ekle
    analysisResult.sources = sources;

    return analysisResult;

  } catch (error) {
    console.error("Analysis Error:", error);
    throw error;
  }
};

// AŞAMA 2: İçerik Yazımı (Framework Kurallarına Göre)
export const generateFinalContent = async (topic: string, analysis: AnalysisResult): Promise<ContentResult> => {
  const modelId = 'gemini-2.5-flash';

  // JSON kurallarını string olarak alıyoruz
  const rulesString = JSON.stringify(FRAMEWORK_RULES, null, 2);

  const prompt = `
    SEN "Kapsamlı İçerik Çerçevesi v6.0" KURALLARINI EKSİKSİZ UYGULAYAN BİR UZMANSIN.

    HEDEF KONU: "${topic}"
    
    REFERANS ALINACAK OUTLINE VE ANALİZ:
    ${JSON.stringify(analysis.outline)}
    
    UYGULANACAK ZORUNLU KURALLAR DOSYASI (content_framework_v6.0.0.json):
    \`\`\`json
    ${rulesString}
    \`\`\`

    GÖREVİN:
    Yukarıdaki "rules" dosyasındaki TÜM kurallara (Word Limits, Lead Structure, Retrieval-First Formatting, FAQ Schema vb.) %100 uyarak nihai makaleyi yaz.
    
    DİKKAT ETMEN GEREKEN KRİTİK NOKTALAR:
    1. **H2 Lead Kuralı:** Her H2'nin altındaki ilk paragraf kesinlikle 40-85 kelime arasında olmalı.
    2. **Formatlama:** "Nasıl yapılır" için <ol>, "Karşılaştırma" için <table> vb. kurallara uy.
    3. **Kelime Limitleri:** H1 (200-400), H2 (150-250), FAQ cevapları (60-120) limitlerini aşma veya altında kalma.
    4. **Ton:** %80+ Aktif ses kullan.

    ÇIKTI FORMATI:
    Sadece Markdown formatında makaleyi ver. Başka bir açıklama yapma.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      // İçerik üretimi sırasında search kullanmıyoruz, analiz verisini kullanıyoruz.
      // Thinking budget vererek kurallara uyumu artırıyoruz.
      config: {
        thinkingConfig: { thinkingBudget: 4096 } 
      }
    });

    return {
      markdown: response.text || "İçerik oluşturulamadı."
    };
  } catch (error) {
    console.error("Content Generation Error:", error);
    throw error;
  }
};