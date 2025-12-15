export const FRAMEWORK_RULES = {
  "schema_version": "draft-07",
  "info": {
    "title": "Kapsamlı İçerik Çerçevesi (Yapı, Strateji, Yönetişim, Kalite, Analiz) - v6.0",
    "description": "Bu ana dosya, içerik üretimi için GEREKLİ TÜM kuralları tek bir yerde toplar. Yapısal limitler (v2), anlamsal SEO (v3), yönetişim (v4), Google Kalite Prensipleri (v5) VE Analiz Filtreleri (v5.1) kurallarına ek olarak, **Ölçeklenebilir Marka Tonu Yönetişimini (v6)** içerir.",
    "version": "6.0.0",
    "last_modified": "2025-10-31",
    "authors": ["ChatGPT", "Kullanıcı tarafından düzenlendi"],
    "sources": [
      "content-v3.0.0.json",
      "governance_v1.json",
      "google_quality_principles.json",
      "analysis_filters.json",
      "lead_detail.json",
      "patch_rules.py (otomatik yama aracı)",
      "retrieval_rules.json",
      "pozitif-pr.json (yeni marka kural kaynağı)"
    ],
    "change_log_ref": "see 'version_history' at end of file",
    "validation_schema": "internal-schema-v6.0.json",
    "notes": "Bu versiyon (v6.0.0), 'governance_framework' içine 1-10 arası ölçeklenebilir marka tonu yönetimi ekler. Önceki tüm kurallar korunmuştur."
  },
  "rule_id": "comprehensive_content_framework_v6",
  "description": "Tüm yapısal, anlamsal, kalite ve marka tonu ölçeklendirme kurallarının tam ve nihai seti.",
  "version": "6.0.0",
  "last_updated": "2025-10-31",

  "governance_framework": {
    "1_content_purpose": {
      "id": "content_purpose",
      "name": "İçeriğin Amacı (Çift Taraflı Niyet)",
      "description": "Hem 'İş Hedefini' (Neden üretiyoruz?) hem de 'Kullanıcı Niyetini' (Neden tüketiyorlar?) tanımlar.",
      "definitions": [
        {
          "business_goal": "Marka Bilinirliği (Brand Awareness)",
          "description": "Markayı yeni kitlelere tanıtmak, konuyla ilgili otorite oluşturmak.",
          "primary_user_intent": ["informational", "navigational"],
          "metrics": ["organik trafik", "gösterim", "yeni kullanıcı"],
          "content_type_ref": ["Blog Yazıları", "Rehberler", "Infografikler"]
        },
        {
          "business_goal": "Talep Yaratma (Lead Generation)",
          "description": "Potansiyel müşterilerin iletişim bilgilerini toplamak, nitelikli 'lead' oluşturmak.",
          "primary_user_intent": ["commercial_investigation", "transactional"],
          "metrics": ["dönüşüm oranı", "MQL (Marketing Qualified Lead)", "form doldurma"],
          "content_type_ref": ["Whitepapers", "E-kitaplar", "Webinarlar", "Vaka Çalışmaları"]
        },
        {
          "business_goal": "Müşteri Eğitimi / Destek (Education & Support)",
          "description": "Mevcut müşterilerin ürünü/hizmeti daha etkin kullanmasını sağlamak, destek yükünü azaltmak.",
          "primary_user_intent": ["informational", "navigational"],
          "metrics": ["sayfada kalma süresi", "hemen çıkma oranı (düşük)", "destek talebi (düşüş)"],
          "content_type_ref": ["Yardım Merkezi Makaleleri", "Nasıl Yapılır Videoları", "FAQ"]
        }
      ]
    },
    "2_target_audience": {
      "id": "target_audience",
      "name": "Hedef Kitle ve Persona Tanımlaması",
      "description": "İçeriğin kime hitap edeceğini tanımlayan genel bir persona şablonu. Her proje/içerik için bu şablonun doldurulması gerekir.",
      "persona_template": {
        "fields": [
          {
            "id": "profile_name",
            "type": "string",
            "description": "Persona için kısa bir isim (Örn: 'Deneyimli Pazarlama Müdürü' veya 'Acemi Ev Sahibi')"
          },
          {
            "id": "expertise_level",
            "type": "enum",
            "options": ["Başlangıç", "Orta Düzey", "Uzman"],
            "description": "Konu hakkındaki bilgi seviyesi. (Bu, dilin karmaşıklığını belirler)"
          },
          {
            "id": "primary_goal",
            "type": "string",
            "description": "Bu personanın içeriği tüketirken ulaşmak istediği temel hedef nedir?"
          },
          {
            "id": "pain_points",
            "type": "array",
            "items": "string",
            "description": "Bu personanın çözmek istediği temel sorunlar veya 'ağrı noktaları' nelerdir?"
          }
        ],
        "example_fill": {
          "profile_name": "Küçük İşletme Sahibi (KOBİ)",
          "expertise_level": "Başlangıç",
          "primary_goal": "Web sitesine nasıl daha fazla müşteri çekeceğini öğrenmek.",
          "pain_points": [
            "SEO'nun ne olduğunu bilmiyor.",
            "Reklam için büyük bütçesi yok.",
            "Teknik bilgiye sahip değil."
          ]
        }
      }
    },
    "3_style_governance_v3": {
      "id": "style_and_voice_scaling",
      "name": "Yazım Dili ve Ton Ölçeklendirme (v3)",

      "universal_style_rules": [
        {
          "rule": "Aktif / Pasif Ses (Active/Passive Voice)",
          "id": "voice_preference",
          "preference": "Aktif Ses (Active Voice)",
          "threshold": { "min_active_ratio": 0.80 },
          "guideline": "Cümleler edilgen (yapıldı, edildi) yerine etken (yaptık, yapın) olmalıdır."
        },
        {
          "rule": "Hitap Şekli (Pronoun Use)",
          "id": "pronoun_preference",
          "options": { "B2B": "Siz (Resmi)", "B2C": "Sen (Samimi)" },
          "guideline": "Hedef kitleye göre (B2B/B2C) tutarlı bir hitap şekli seçilmelidir."
        },
        {
          "rule": "Terminoloji (Terminology)",
          "id": "jargon_use",
          "guideline": "Hedef kitlenin 'expertise_level' (Uzmanlık Seviyesi) 'Uzman' değilse, teknik jargondan kaçınılmalı veya açıkça tanımlanmalıdır."
        },
        {
          "rule": "Olumluluk (Positivity)",
          "id": "sentiment_preference",
          "preference": "Pozitif veya Nötr",
          "guideline": "Genel dilin negatif duygudan kaçınması esastır."
        }
      ],

      "brand_voice_scaling_mechanism": {
        "scaling_parameter_name": "tone_governance_level",
        "scaling_source": "briefing_input.tone_governance_level",
        "scaling_range": "1-10",
        "external_voice_rules_source": "pozitif-pr.json",
        "application_logic": "Briefte belirtilen 'tone_governance_level' (N) değeri, Evrensel Kurallar (1) ile Marka Kuralları (10) arasında ağırlıklı bir ortalama (N/10) uygular. N=10 ise, harici kaynaktaki (pozitif-pr.json) kurallar evrensel kuralları ezerek mutlak öncelik kazanır."
      },
      "notes": "Bu v3 yapısı, evrensel kuralları korur ve 'pozitif-pr.json' dosyasını kullanarak 1-10 arası ölçeklenebilir marka tonu kısıtlamaları ekler."
    }
  },
  "global_rules": {
    "sentence_length": { "min_avg": 14, "max_avg": 19, "max_per_sentence": 26 },
    "paragraph_sentence_count": { "min": 3, "max": 6 },
    "lead": {
      "apply_to": "H2",
      "required": true,
      "position": "under_H2_before_H3",
      "length": {
        "sentences": { "min": 1, "max": 5 },
        "words": { "min": 40, "max": 85 }
      },
      "sentences": {
        "max_words": 24,
        "avg_target_words": 18,
        "tolerance": 6,
        "acceptable_range": { "min": 12, "max": 24 }
      },
      "paragraphs": { "count": 1 },
      "tone": {
        "voice": "active",
        "style": "bilgilendirici",
        "avoid": ["clickbait", "gereksiz sıfat", "abartı"]
      },
      "rules": {
        "sentence_avg_words": { "target": 18, "tolerance": 6 },
        "paragraph_sentence_count": { "min": 3, "max": 5 },
        "total_word_range": { "min": 40, "max": 85 },
        "max_sentence_length": 24
      },
      "count_lead_in_section_word_limits": true,
      "lead_ignores_global_paragraph_sentence_count": true,
      "ref": {
        "source": "lead_detail.json",
        "summary": "Her H2 altında tek paragrafta, 40–85 kelime arasında, aktif sesle yazılmış 1–5 cümlelik lead bulunmalı. Cümleler 12–24 kelime arasında olmalı, ortalama 18 kelime hedeflenmeli."
      },
      "examples": [
        {
          "h2": "Site Hızı Optimizasyonu",
          "lead": "Sayfa yüklenme süresini azaltmak, kullanıcı deneyimini güçlendirir ve arama motoru sıralamalarını doğrudan iyileştirir. Hızlı açılan sayfalar, hemen çıkma oranını düşürür, oturum süresini artırır ve dönüşüme giden akışı hızlandırır. Görselleri sıkıştırmak, önbellekleme politikalarını optimize etmek, kritik kaynakları öne almak ve gereksiz betikleri kaldırmak temel adımlardır. Bu iyileştirmeler, tıklama sonrası memnuniyeti artırırken reklam harcamalarının verimliliğini ve organik görünürlüğü birlikte destekler."
        },
        {
          "h2": "Anahtar Kelime Haritalama",
          "lead": "Anahtar kelime haritalama, her sayfanın hedeflediği sorguları netleştirir ve içeriklerin birbirinin trafik alanını işgal etmesini engeller. Bu yaklaşım, arama motorlarına güçlü bir konu sinyali gönderir ve yetkiyi sayfalara daha dengeli biçimde dağıtır. Haritalama yapılırken niyet kümeleri oluşturmak, başlık hiyerarşisini hizalamak ve dahili bağlantıları planlamak performansı belirgin biçimde artırır. Sonuç olarak, kullanıcıların aradığı sayfaya hızla ulaşması sağlanır ve site genelinde oturumlar daha yüksek değer üretir."
        },
        {
          "h2": "İçerik Yenileme Stratejisi",
          "lead": "Zamanla güncelliğini yitiren içerikler, rakiplerin yeni verilerle güçlendirdiği sayfalar karşısında sıralama kaybı yaşar. İçerik yenileme stratejisi, başlık yapısını gözden geçirip istatistikleri tazeler, görselleri optimize eder ve yeni iç bağlantılar ekler. Bu güncellemeler, kullanıcı niyetiyle daha yüksek uyum sağlayarak tıklama oranını ve sayfada kalma süresini anlamlı biçimde artırır. Düzenli tarama ve rakip analiziyle desteklendiğinde, sayfa otoritesi korunur ve eskimiş içerikler yeniden trafik üretmeye başlar."
        }
      ]
    },
    "readability": {
      "preferred_grade": "B2-C1",
      "avoid_passive_ratio": { "threshold": 0.25, "operator": "lt" }
    },
    "style": {
      "tone": "bilgilendirici",
      "perspective": "3. tekil kişi",
      "avoid": ["karmaşık cümle", "gereksiz tekrar"]
    }
  },
  "retrieval_principles": {
    "strategy": {
      "id": "retrieval-first",
      "name": "Retrieval-First Stratejisi (Getirme-Odaklı)",
      "description": "Temel prensip: Arama motorlarına 'belge' değil, 'cevap' sunmak. Odak noktası, kullanıcının sorgusuna en hızlı ve en doğru 'bilgi parçasını' (answer snippet) sağlamaktır.",
      "principles": [
        {
          "principle": "Doğrudan Cevaplama (Directness)",
          "guideline": "Her başlık (H2, H3) bir soru olarak kabul edilmeli ve altındaki ilk paragraf veya format (liste, tablo) bu soruya doğrudan, dolambaçsız bir cevap vermelidir. 'Ters Piramit' modeli (en önemli bilgi en başta) uygulanmalıdır."
        },
        {
          "principle": "Niyetle Eşleşme (Intent Matching)",
          "guideline": "Kullanıcının sorgusunun niyeti (bilgi, karşılaştırma, talimat) ne ise, içerik formatı (content-type) o olmalıdır. Bkz: 'intent_format_mapping'."
        },
        {
          "principle": "Cevap Çıkarımı (Answer Extraction)",
          "guideline": "İçerik, Google'ın SGE (Search Generative Experience) veya Öne Çıkan Snippet (Featured Snippet) için kolayca 'getirebileceği' (retrieve) net, bağımsız ve anlaşılır bilgi birimleri halinde tasarlanmalıdır."
        }
      ]
    },
    "mechanism": {
      "id": "passage-level",
      "name": "Passage-Level Optimizasyonu (Parça-Düzeyinde)",
      "description": "İçeriğin, arama motorları tarafından 'parçalara' (passages) ayrılabilmesi ve her parçanın ayrı ayrı değerlendirilebilmesi için teknik ve yapısal kurallar.",
      "rules": [
        {
          "rule": "Başlık Özgüllüğü (Heading Specificity)",
          "guideline": "Her H2 ve H3 başlığı, spesifik bir 'long-tail' sorguyu veya kullanıcı sorusunu tam olarak yansıtmalıdır. 'Genel' başlıklardan (Örn: 'Önemli Noktalar') kaçınılmalıdır."
        },
        {
          "rule": "Bölüm Atomikliği (Section Atomicity)",
          "guideline": "Her başlık (özellikle H3) altındaki içerik, o başlığın konusunu başka bir bölüme bağımlı olmadan, kendi kendine yetecek şekilde (atomik) cevaplayabilmelidir. Bu, Google'ın o 'parçayı' tek başına alıp sunabilmesi için kritiktir."
        },
        {
          "rule": "Bağlamsal İzolasyon (Contextual Isolation)",
          "guideline": "Bir başlık altında, o başlığın konusu dışına çıkılmamalıdır (context drift). Farklı bir konuya geçiliyorsa, yeni ve uygun bir H2/H3 başlığı açılmalıdır."
        }
      ]
    },
    "tactics": {
      "id": "content-type-formatting",
      "name": "İçerik Formatlama Kuralları (Content-Type)",
      "description": "Kullanıcı niyetine (Intent) göre seçilmesi gereken zorunlu semantik HTML formatları. Bu, 'Retrieval-First' stratejisinin taktiksel uygulamasıdır.",
      "intent_format_mapping": [
        {
          "intent": [
            "Nasıl Yapılır",
            "Adım Adım",
            "Süreç",
            "Tarif",
            "Kronolojik Sıralama"
          ],
          "query_type": "transactional_informational",
          "required_format": {
            "name": "Numaralı Liste (Ordered List)",
            "html_tag": "<ol>",
            "guideline": "Bir sürecin veya sıranın adımlarını göstermek için ZORUNLU olarak <ol> etiketi kullanılmalıdır. Her <li> (liste öğesi) net, uygulanabilir bir eylem içermelidir. Düz paragraf olarak yazılmamalıdır."
          }
        },
        {
          "intent": [
            "Faydaları",
            "Özellikleri",
            "Türleri",
            "İpuçları",
            "Gereksinimler",
            "En İyiler (Sırasız)"
          ],
          "query_type": "informational",
          "required_format": {
            "name": "Maddeli Liste (Unordered List)",
            "html_tag": "<ul>",
            "guideline": "Birbiriyle ilişkili ancak hiyerarşisi olmayan öğeler (örn: faydalar) için ZORUNLU olarak <ul> etiketi kullanılmalıdır. 'Ve, ayrıca, ek olarak' gibi bağlaçlarla paragrafa yedirilmemelidir."
          }
        },
        {
          "intent": [
            "Karşılaştırma",
            "X vs. Y",
            "Fiyatlandırma",
            "Teknik Özellikler",
            "Alternatifler"
          ],
          "query_type": "commercial_investigation",
          "required_format": {
            "name": "Tablo (Table)",
            "html_tag": "<table>",
            "guideline": "İki veya daha fazla öğeyi (ürün, hizmet, özellik) doğrudan karşılaştırmak için ZORUNLU olarak <table> formatı tercih edilmelidir. <th> (başlık) ve <td> (veri) hücreleri net ve tutarlı olmalıdır. Bu, Google'ın SGE'de kendi karşılaştırma tablolarını oluşturması için en temiz veridir."
          }
        },
        {
          "intent": ["Nedir?", "Tanımı", "Anlamı", "Ne İşe Yarar?"],
          "query_type": "informational_definition",
          "required_format": {
            "name": "Tanım Paragrafı (Definition Paragraph)",
            "html_tag": "<p>",
            "guideline": "Başlığın (H2/H3) altındaki İLK CÜMLE, sorulan terimi veya konsepti net, kısa ve tek başına bir 'öne çıkan snippet' olabilecek şekilde tanımlamalıdır. Mümkünse ilgili terim <strong> veya <dfn> ile vurgulanabilir."
          }
        },
        {
          "intent": [
            "Neden?",
            "Kim?",
            "Ne Zaman?",
            "Spesifik Sorular"
          ],
          "query_type": "informational",
          "required_format": {
            "name": "Sık Sorulan Sorular (FAQ)",
            "html_tag": "schema.org/FAQPage",
            "guideline": "Bir konuyla ilgili spesifik ve sıkça sorulan sorular için 'Sık Sorulan Sorular' bölümü kullanılmalıdır. Her soru net bir H3 (veya H2 altındaysa H3) olmalı ve cevabı 'Tanım Paragrafı' kuralına uymalıdır.",
            "ref": "Bkz: rules -> 'FAQ' tanımı (yapısal limitler için)"
          }
        },
        {
          "intent": [
            "Ürün İncelemesi",
            "En İyi X Ürünü",
            "X vs. Y Ürün Karşılaştırması",
            "Review"
          ],
          "query_type": "commercial_investigation_review",
          "required_format": {
            "name": "Ürün İncelemesi Sistemi (Product Reviews System) Formatı",
            "html_tag": "N/A (Yapısal)",
            "guideline": "İnceleme, yüzeysel olmamalı, E-E-A-T (özellikle 'Deneyim') prensiplerine uymalıdır. İçerik 'Helpful Content System' (HCS) tarafından değerlendirilir.",
            "required_elements": [
              {
                "id": "expert_analysis",
                "description": "Ürünün kimin için olduğu, artıları ve eksileri net bir şekilde belirtilmelidir (tercihen <ul> veya <table>).",
                "ref": "Bkz: 'google_quality_principles.eeat_guidelines.experience'"
              },
              {
                "id": "original_evidence",
                "description": "Ürünün bizzat denendiğini gösteren kanıtlar sunulmalıdır (örn: yazarın çektiği orijinal fotoğraflar, videolar, test sonuçları)."
              },
              {
                "id": "quantitative_data",
                "description": "Performansı ölçen nicel veriler (örn: 'pil ömrü: 8 saat', 'yüklenme süresi: 1.2s') sağlanmalıdır."
              },
              {
                "id": "competitor_comparison",
                "description": "Ürün, rakiplerinden veya alternatiflerinden (varsa) neyi daha iyi/kötü yaptığı konusunda karşılaştırılmalıdır.",
                "ref": "Bkz: 'intent_format_mapping' -> 'Karşılaştırma' -> '<table>' kuralı."
              }
            ]
          }
        }
      ]
    }
  },
  "google_quality_principles": {
    "id": "google_quality_principles",
    "name": "Google Kalite Prensipleri ve Sinyalleri",
    "description": "Bu blok, içeriğin 'robotlar' (Google algoritmaları) tarafından nasıl değerlendirileceğini tanımlar. E-E-A-T, HCS ve YMYL gibi temel değerlendirme sistemlerine uyumluluğu yönetir.",
    "version": "1.0.0",
    "eeat_guidelines": {
      "id": "eeat",
      "name": "E-E-A-T (Deneyim, Uzmanlık, Otoriterlik, Güvenilirlik)",
      "description": "Google Kalite Değerlendiricileri (QRG) tarafından kullanılan ve algoritmaların hedeflediği temel kalite çerçevesi.",
      "principles": [
        {
          "id": "experience",
          "name": "Deneyim (Experience)",
          "guideline": "İçerik, yazarın konuyu bizzat deneyimlediğini gösteren kanıtlar sunmalıdır. Yüzeysel, teorik bilgiden öteye geçmelidir.",
          "implementation": "Orijinal fotoğraflar/videolar kullanmak, 'Ürünü test ettiğimizde fark ettik ki...', 'Bu süreci bizzat uyguladığımda...' gibi birinci elden ifadeler eklemek."
        },
        {
          "id": "expertise",
          "name": "Uzmanlık (Expertise)",
          "guideline": "İçerik, konunun uzmanı tarafından yazıldığını hissettiren teknik doğruluk, derinlik ve içgörü (insight) sunmalıdır.",
          "implementation": "Karmaşık konuları basitçe açıklamak, veri/istatistik sunmak, yüzeysel olmayan analizler yapmak."
        },
        {
          "id": "authoritativeness",
          "name": "Otoriterlik (Authoritativeness)",
          "guideline": "Yazarın ve sitenin, ele alınan konu özelindeki otoritesi net bir şekilde belirtilmelidir.",
          "implementation": "Her makalede net bir 'Yazar Biyografisi (Author Bio)' bulunmalıdır. İddialar, saygın dış kaynaklara (akademik, resmi, .gov) atıf yaparak desteklenmelidir."
        },
        {
          "id": "trustworthiness",
          "name": "Güvenilirlik (Trustworthiness)",
          "guideline": "Kullanıcıya güven veren şeffaf bir yapı kurulmalıdır. Özellikle YMYL konularında bu kritiktir.",
          "implementation": "Reklamlar ve 'affiliate' (satış ortaklığı) bağlantıları net bir 'açıklama' (disclosure) ile belirtilmelidir. Sitenin 'Hakkımızda' ve 'İletişim' sayfaları kolayca erişilebilir olmalıdır."
        }
      ]
    },
    "helpful_content_system": {
      "id": "hcs",
      "name": "Yardımcı İçerik Sistemi (HCS) Uyumluluğu",
      "description": "İçeriğin 'İnsan-Odaklı' (People-First) olmasını sağlamak ve 'SEO-Odaklı' (SEO-First) sinyallerden kaçınmak için kurallar.",
      "principle": "İçerik, okuyucunun sorusunu tam olarak cevaplamalı ve onu tatmin edici bir deneyimle bırakmalıdır. Sadece arama motorunda sıralama almak için yazılmamalıdır.",
      "avoid_seo_first_signals": [
        {
          "id": "fluff_content",
          "name": "Gereksiz Uzatma (Boş İçerik)",
          "guideline": "Cevabı vermeden önce konuyu gereksiz yere uzatan, sadece kelime sayısı (word count) hedefi için yazılmış paragraflardan kaçınılmalıdır. Her cümle bir amaca hizmet etmelidir.",
          "ref": "Bkz: 'retrieval_principles.mechanism.section_atomicity'"
        },
        {
          "id": "unanswered_promise",
          "name": "Karşılanmayan Vaat",
          "guideline": "Başlığın (H1, H2) vadettiği (örn: 'En Kapsamlı Rehber') ile içeriğin sunduğu (eksik, yüzeysel bilgi) arasında uyumsuzluk olmamalıdır."
        },
        {
          "id": "keyword_stuffing",
          "name": "Anahtar Kelime Doldurma",
          "guideline": "Anahtar kelimeler metin içinde doğal olmayan bir sıklıkta ve anlamsızca tekrarlanmamalıdır. 'global_rules.readability' hedeflerine uyulmalıdır."
        },
        {
          "id": "off_topic_expertise",
          "name": "Uzmanlık Dışı İçerik",
          "guideline": "Sitenin ana uzmanlık alanı (otoritesi) dışında olan, sadece popüler (trend) olduğu için yazılan alakasız içerikler HCS tarafından olumsuz değerlendirilebilir."
        }
      ]
    },
    "ymyl_policy": {
      "id": "ymyl",
      "name": "YMYL (Paranız veya Hayatınız) Politikası",
      "description": "Finans, sağlık, hukuk, güvenlik gibi yüksek riskli 'Paranız veya Hayatınız' konularında uygulanacak katı E-E-A-T kuralları.",
      "trigger": "Eğer içerik konusu 'sağlık', 'finans', 'hukuk', 'güvenlik' alanlarından birine giriyorsa, aşağıdaki kurallar ZORUNLUDUR:",
      "rules": [
        {
          "id": "expert_authorship",
          "guideline": "Yazarın uzmanlığı (diploma, sertifika, mesleki deneyim) yazar biyo'sunda netçe belirtilmelidir."
        },
        {
          "id": "primary_sourcing",
          "guideline": "Tüm tıbbi, finansal ve yasal iddialar, birincil ve en yüksek otoriteye sahip kaynaklara (örn: .gov, .edu, saygın bilimsel dergiler, resmi kanun metinleri) atıf yapmalıdır."
        },
        {
          "id": "avoid_opinion",
          "guideline": "Kişisel görüş ('Bence...', 'Hissediyorum ki...') yerine kanıta dayalı ('Araştırmalar gösteriyor ki...', 'Uzmanlar belirtiyor ki...') bir dil kullanılmalıdır."
        }
      ]
    }
  },
  "rules": [
    {
      "heading": "H1",
      "word_limits": { "min": 200, "max": 400 },
      "apply_structural_limits": {
        "use_global_sentence_length": true,
        "use_global_paragraph_sentence_count": true
      },
      "notes": "H1 bölümü 200–400 kelime olmalı. 3 farklı primary_kw’ye internal link verilmelidir. Anchor kelimeler primary_kw listesinden seçilir."
    },
    {
      "heading": "H2",
      "word_limits": { "min": 150, "max": 250 },
      "apply_structural_limits": {
        "use_global_sentence_length": true,
        "use_global_paragraph_sentence_count": true
      },
      "notes": "H2 bölümleri 150–250 kelime aralığında olmalı. Anchor kelimeler anchor_core listesinden seçilir."
    },
    {
      "heading": "H3",
      "word_limits": { "min": 100, "max": 150 },
      "apply_structural_limits": {
        "use_global_sentence_length": true,
        "use_global_paragraph_sentence_count": true
      },
      "notes": "H3 bölümleri 100–150 kelime aralığında olmalı. Anchor kelimeler AI tarafından LSI ve semantik bağlama göre belirlenir."
    },
    {
      "heading": "FAQ",
      "render": { "heading_level": "H2", "title_fixed": "Sık Sorulan Sorular" },
      "word_limits": { "min": 60, "max": 120 },
      "qa_limits": { "min_questions": 4, "max_questions": 6 },
      "apply_structural_limits": {
        "use_global_sentence_length": true,
        "use_global_paragraph_sentence_count": true
      },
      "structured_data": {
        "type": "FAQPage",
        "format": "JSON-LD",
        "required": true,
        "qa_items_min": 4,
        "qa_items_max": 6,
        "validation": {
          "must_include": ["@context", "@type", "mainEntity"],
          "context_value": "https://schema.org",
          "mainEntity_type": "array<Question>"
        }
      },
      "notes": "Sık Sorulan Sorular bölümü 4–6 soru-cevap içermelidir. Her cevap 60–120 kelime ve 1–2 paragraf arasında olmalı. Gerektiğinde 1–2 dahili link ver; anchorlar kalın ve title içermeli."
    },
    {
      "heading": "CTA",
      "render": { "heading_level": "H2", "title_fixed": "CTA" },
      "word_limits": { "min": 30, "max": 60 },
      "apply_structural_limits": {
        "use_global_sentence_length": true,
        "use_global_paragraph_sentence_count": true
      },
      "notes": "CTA tek paragraf olmalı (30–60 kelime). Ana hedef sayfaya 1 dahili link ver (örn. kayıt, demo, fiyatlandırma). Konum: sayfa sonu."
    }
  ],
  "analysis_filters": {
    "id": "analysis_filters",
    "name": "Analiz Filtreleri ve Yapılandırmaları",
    "description": "Brief oluşturma aşamasında (örn: Colab script'i) kullanılacak yapılandırma verilerini içerir. Rakip analizi verilerini temizlemek için kullanılır.",
    "version": "1.0.0",
    "junk_headings": {
      "id": "junk_headings_filter",
      "description": "Rakip analizinden (headings-content.json) gelen, içerikle ilgisi olmayan, 'gezinme' (navigational) amaçlı başlıkları filtrelemek için kullanılır. Liste sürekli güncellenmelidir.",
      "match_type": "exact_lowercase_normalized",
      "filter_list": [
        "i̇çindekiler", "kaynakça", "ayrıca bakınız", "notlar", "referanslar",
        "genel bakış", "son yazılar", "etiketler", "kategoriler", "hakkımızda",
        "i̇letişim", "learn", "resources", "developers", "help", "yasal sayfalar",
        "popüler konular", "yeni yazıları i̇nceleyin", "blog", "başarı hikayeleri",
        "kurumsal", "merkez ofisimiz", "ürünle ilgili diğer kaynaklara göz atın",
        "ücretsiz bir hesap açmak için kaydolun", "konsolda oluşturmaya başlayın",
        "aws'de sonraki adımlar",
        "diğer yazılar",
        "taki̇p et",
        "bi̇zden haberdar olun",
        "si̇te hari̇tasi",
        "kullanici paneli̇",
        "sonuç",
        "sıkça sorulan sorular"
      ]
    }
  },
  "version_history": [
    {
      "version": "2.0",
      "date": "2025-10-22",
      "summary": "Temel kelime limitleri, paragraf aralıkları ve dahili bağlantı kuralları tanımlandı."
    },
    {
      "version": "2.1",
      "date": "2025-10-25",
      "summary": "Lead yapısı eklendi (H2 altında 1–2 cümlelik kısa açıklama)."
    },
    {
      "version": "2.2",
      "date": "2025-10-28",
      "summary": "Lead için kelime aralığı 40–85, cümle uzunluğu 12–24 olarak revize edildi. Örnekler ve bilgilendirici ton tanımı eklendi."
    },
    {
      "version": "2.2.1",
      "date": "2025-10-30",
      "summary": "Global sentence ve paragraph limitleri kalıtım ile yönetilmeye başladı; apply_structural_limits eklendi. Readability alanı sayısal eşiğe çevrildi."
    },
    {
      "version": "3.0.0",
      "date": "2025-10-30",
      "summary": "'Retrieval-First', 'Passage-Level' ve 'Content-Type' (Formatlama) kurallarını içeren 'retrieval_principles' adında yeni bir stratejik katman eklendi."
    },
    {
      "version": "4.0.0",
      "date": "2025-10-30",
      "summary": "**BÜYÜK BİRLEŞME**: 'governance_framework' (Amaç, Kitle, Ton) ana yapıya eklendi. Artık tek bir dosya hem yapısal/anlamsal kuralları hem de yönetişim stratejisini içeriyor."
    },
    {
      "version": "5.0.0",
      "date": "2025-10-30",
      "summary": "**DEĞERLENDİRME KATMANI EKLENDİ**: 'google_quality_principles' (E-E-A-T, HCS, YMYL) ana blok olarak eklendi. 'retrieval_principles' altına 'Product Reviews System' (Ürün İnceleme) için niyet yaması eklendi."
    },
    {
      "version": "5.1.0",
      "date": "2025-10-30",
      "summary": "**YAPILANDIRMA KATMANI EKLENDİ**: 'analysis_filters' (özellikle 'junk_headings' listesi) ana blok olarak eklendi. Bu, Colab script'inin dinamik filtreleme yapmasını sağlar."
    },
    {
      "version": "6.0.0",
      "date": "2025-10-31",
      "summary": "**BÜYÜK YÖNETİŞİM GÜNCELLEMESİ**: Marka Sesini 1-10 arası ölçeklendiren (Brand Voice Scaling) mekanizma ve harici 'pozitif-pr.json' kural seti bağlandı. '3_style_governance' v3'e yükseltildi."
    }
  ]
};