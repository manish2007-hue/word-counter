export const languages = {
  en: 'English',
  es: 'Español',
  ja: '日本語',
  fr: 'Français',
  de: 'Deutsch',
  pt: 'Português',
  ko: '한국어',
  it: 'Italiano',
} as const;

export type SupportedLang = keyof typeof languages;

export const defaultLang: SupportedLang = 'en';
export const showDefaultLang = false;

export const ui = {
  en: {
    // Navigation & Common
    'nav.wordCounter': 'Word Counter',
    'nav.tools': 'Tools',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.privacy': 'Privacy',
    'nav.terms': 'Terms',
    'nav.shortcuts': 'Shortcuts',
    'nav.find': 'Find',
    'trust.pill': '100% Local',
    'trust.title': '100% Client-Side. Your text never leaves your device.',
    
    // Meta / SEO
    'meta.title': 'Free Word Counter – 100% Private, Instant & No Ads',
    'meta.description': 'Count words, characters, sentences & reading time in real time with zero ads. 100% private in-browser text tool for writers & students. Try it free!',
    'meta.keywords': 'word counter, free word counter, word count checker, online word counter, private word counter, word counter no ads, essay word counter, count characters, reading time calculator',
    
    // Hero
    'hero.eyebrow': 'Developer-Grade Writing & LLM Analytics · 100% Client-Side Privacy',
    'hero.title': 'Free Online Word Counter &',
    'hero.titleGradient': 'Readability Engine',
    'hero.description': 'Count words, characters, sentences, LLM tokens, and reading time in real time. In-memory PDF/DOCX parsing with zero server calls.',
    'hero.loadSample': 'Load Sample Document',
    'hero.pastePrompt': 'or paste text directly below ↓',
    
    // Metric Cards
    'metrics.words': 'Words',
    'metrics.characters': 'Characters',
    'metrics.sentences': 'Sentences',
    'metrics.paragraphs': 'Paragraphs',
    'metrics.readingTime': 'Reading Time',
    'metrics.speakingTime': 'Speaking Time',
    'metrics.pages': 'Pages',
    'metrics.noSpaces': 'no spaces',
    'metrics.avgChars': 'Avg chars/word',
    'metrics.moreStats': 'More Stats',
    
    // Actions & Editor
    'editor.placeholder': 'Start typing or paste your text here (Ctrl+V). Drag and drop .docx, .pdf, or .txt files for instant local parsing...',
    'editor.copy': 'Copy Text',
    'editor.copied': 'Copied!',
    'editor.clear': 'Clear',
    'editor.undo': 'Undo',
    'editor.redo': 'Redo',
    'editor.sample': 'Sample',
    'editor.case': 'Case',
    'editor.export': 'Export',
    'editor.target': 'Target Goal',
    'editor.dropTitle': 'Drop file to count words locally',
    'editor.dropDesc': 'PDF, DOCX, TXT, or MD — 100% processed in browser memory',
    
    // Tabs
    'tab.keywords': 'Keyword Density',
    'tab.readability': 'Readability Scores',
    'tab.social': 'Social Media Limits',
    'tab.academic': 'Academic Essay Mode',
    'tab.style': 'Style Analyzer',
    'tab.tokens': 'AI Token Counter',
    
    // SEO Sections
    'seo.editorialTitle': 'Editorial Guide & Technical Analysis',
    'seo.overviewHeading': 'Comprehensive Real-Time Text Analysis Engine',
    'seo.overviewBody': 'CleanWordCounter is engineered from the ground up for authors, copywriters, researchers, students, and software engineers who require precision word metrics without compromising privacy. Unlike legacy online word counters that transmit keystrokes to remote servers, every algorithm here operates inside your browser sandbox.',
    'seo.faqHeading': 'Frequently Asked Questions & Reference Manual',
    'seo.faqSub': 'Detailed answers to common counting queries, formatting guidelines, and privacy architecture.',
  },
  
  es: {
    // Navigation & Common
    'nav.wordCounter': 'Contador de Palabras',
    'nav.tools': 'Herramientas',
    'nav.about': 'Acerca de',
    'nav.contact': 'Contacto',
    'nav.privacy': 'Privacidad',
    'nav.terms': 'Términos',
    'nav.shortcuts': 'Atajos',
    'nav.find': 'Buscar',
    'trust.pill': '100% Local',
    'trust.title': '100% del lado del cliente. Tu texto nunca sale de tu dispositivo.',
    
    // Meta / SEO
    'meta.title': 'Contador de Palabras Gratis – 100% Privado, Instantáneo y Sin Anuncios',
    'meta.description': 'Cuenta palabras, caracteres, oraciones y tiempo de lectura en tiempo real sin anuncios. Herramienta 100% privada en tu navegador. ¡Pruébalo gratis!',
    'meta.keywords': 'contador de palabras, contar palabras, contador de caracteres, contar caracteres, contador de palabras online, contador de palabras gratis, calcular tiempo de lectura',
    
    // Hero
    'hero.eyebrow': 'Análisis de Redacción y Métricas LLM · 100% Privacidad en el Navegador',
    'hero.title': 'Contador de Palabras Online &',
    'hero.titleGradient': 'Motor de Legibilidad',
    'hero.description': 'Cuenta palabras, caracteres, oraciones, tokens IA y tiempo de lectura en tiempo real. Análisis seguro de PDF y DOCX en memoria local.',
    'hero.loadSample': 'Cargar Documento de Ejemplo',
    'hero.pastePrompt': 'o pega tu texto directamente abajo ↓',
    
    // Metric Cards
    'metrics.words': 'Palabras',
    'metrics.characters': 'Caracteres',
    'metrics.sentences': 'Oraciones',
    'metrics.paragraphs': 'Párrafos',
    'metrics.readingTime': 'Tiempo de Lectura',
    'metrics.speakingTime': 'Tiempo al Hablar',
    'metrics.pages': 'Páginas',
    'metrics.noSpaces': 'sin espacios',
    'metrics.avgChars': 'Promedio car/palabra',
    'metrics.moreStats': 'Más Estadísticas',
    
    // Actions & Editor
    'editor.placeholder': 'Escribe o pega tu texto aquí (Ctrl+V). Arrastra archivos .docx, .pdf o .txt para un análisis local e instantáneo...',
    'editor.copy': 'Copiar Texto',
    'editor.copied': '¡Copiado!',
    'editor.clear': 'Limpiar',
    'editor.undo': 'Deshacer',
    'editor.redo': 'Rehacer',
    'editor.sample': 'Ejemplo',
    'editor.case': 'Mayús/Minús',
    'editor.export': 'Exportar',
    'editor.target': 'Objetivo',
    'editor.dropTitle': 'Suelta tu archivo para contar palabras localmente',
    'editor.dropDesc': 'PDF, DOCX, TXT o MD — 100% procesado en la memoria de tu navegador',
    
    // Tabs
    'tab.keywords': 'Densidad de Palabras Clave',
    'tab.readability': 'Nivel de Legibilidad',
    'tab.social': 'Límites de Redes Sociales',
    'tab.academic': 'Modo Ensayo Académico',
    'tab.style': 'Analizador de Estilo',
    'tab.tokens': 'Contador de Tokens IA',
    
    // SEO Sections
    'seo.editorialTitle': 'Guía Editorial y Análisis Técnico',
    'seo.overviewHeading': 'Motor Integral de Análisis de Texto en Tiempo Real',
    'seo.overviewBody': 'CleanWordCounter fue diseñado para autores, periodistas, estudiantes y desarrolladores que necesitan métricas de texto precisas con total privacidad. A diferencia de otros contadores web, ningún texto se envía a servidores externos.',
    'seo.faqHeading': 'Preguntas Frecuentes y Manual de Referencia',
    'seo.faqSub': 'Respuestas claras a dudas sobre recuento de palabras, caracteres, páginas y normas académicas.',
  },
  
  ja: {
    // Navigation & Common
    'nav.wordCounter': '文字数カウント',
    'nav.tools': 'ツール一覧',
    'nav.about': '当サイトについて',
    'nav.contact': 'お問い合わせ',
    'nav.privacy': 'プライバシーポリシー',
    'nav.terms': '利用規約',
    'nav.shortcuts': 'ショートカット',
    'nav.find': '検索',
    'trust.pill': '100% ローカル',
    'trust.title': '100%クライアント側処理。文章が外部サーバーに送信されることはありません。',
    
    // Meta / SEO
    'meta.title': '無料文字数カウント・単語数チェッカー – 100%完全プライベート・広告なし',
    'meta.description': '単語数、文字数（空白あり/なし）、文数、読了時間をリアルタイムでカウント。完全ローカル処理で安全・広告なしの無料文字数チェッカー。',
    'meta.keywords': '文字数カウント, 単語数カウント, 文字数チェッカー, 単語カウント, 無料文字数カウント, 読了時間, レポート 文字数, 文字カウント',
    
    // Hero
    'hero.eyebrow': '開発者品質の文章解析 & LLMトークン計算 · 100%完全ローカル保護',
    'hero.title': '無料オンライン文字数カウント &',
    'hero.titleGradient': '文章分析エンジン',
    'hero.description': 'リアルタイムで文字数・単語数・文数・段落・読了時間を即座に計測。PDF/Wordファイルもブラウザ内メモリで安全に解析。',
    'hero.loadSample': 'サンプルテキストを読み込む',
    'hero.pastePrompt': 'または以下に直接テキストを入力・貼り付け ↓',
    
    // Metric Cards
    'metrics.words': '単語数',
    'metrics.characters': '文字数',
    'metrics.sentences': '文数',
    'metrics.paragraphs': '段落数',
    'metrics.readingTime': '読了時間',
    'metrics.speakingTime': '朗読時間',
    'metrics.pages': '原稿用紙/ページ',
    'metrics.noSpaces': '空白を除く文字数',
    'metrics.avgChars': '平均文字数/単語',
    'metrics.moreStats': '詳細統計',
    
    // Actions & Editor
    'editor.placeholder': 'ここにテキストを入力またはペーストしてください (Ctrl+V)。DOCX, PDF, TXTファイルをドラッグ＆ドロップすると即座にローカル解析されます...',
    'editor.copy': 'コピー',
    'editor.copied': 'コピー完了！',
    'editor.clear': 'クリア',
    'editor.undo': '元に戻す',
    'editor.redo': 'やり直し',
    'editor.sample': 'サンプル',
    'editor.case': '大文字/小文字',
    'editor.export': '書き出し',
    'editor.target': '目標文字数',
    'editor.dropTitle': 'ファイルをドロップして即座に文字数を計算',
    'editor.dropDesc': 'PDF, DOCX, TXT, MD — 外部サーバーを介さずブラウザ内で100%安全に処理',
    
    // Tabs
    'tab.keywords': 'キーワード出現頻度',
    'tab.readability': '可読性スコア',
    'tab.social': 'SNS文字数制限',
    'tab.academic': '論文・レポート形式',
    'tab.style': '文章スタイル分析',
    'tab.tokens': 'AIトークン計算',
    
    // SEO Sections
    'seo.editorialTitle': '解説ガイド & 技術リファレンス',
    'seo.overviewHeading': 'プライバシー完全保護の高精度リアルタイム文章解析ツール',
    'seo.overviewBody': 'CleanWordCounterは、作家・学生・ビジネスパーソン・エンジニアのために開発された高精度なテキスト分析ツールです。入力された文章はブラウザ内部でのみ処理され、外部に送信されることは一切ありません。',
    'seo.faqHeading': 'よくある質問と文字数ガイド',
    'seo.faqSub': '文字数カウント方法、原稿用紙換算、各種SNSの文字数制限について詳しく解説します。',
  },
  
  fr: {
    // Navigation & Common
    'nav.wordCounter': 'Compteur de Mots',
    'nav.tools': 'Outils',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.privacy': 'Confidentialité',
    'nav.terms': 'Conditions',
    'nav.shortcuts': 'Raccourcis',
    'nav.find': 'Rechercher',
    'trust.pill': '100% Local',
    'trust.title': '100% côté client. Vos textes ne quittent jamais votre appareil.',
    
    // Meta / SEO
    'meta.title': 'Compteur de Mots Gratuit – 100% Privé, Instantané & Sans Publicité',
    'meta.description': 'Comptez les mots, caractères, phrases et temps de lecture en temps réel sans publicité. Outil 100% privé dans le navigateur pour rédacteurs et étudiants.',
    'meta.keywords': 'compteur de mots, compter les mots, compteur de caractères, nombre de mots, calcul temps de lecture, compteur de mots gratuit, compter mots en ligne',
    
    // Hero
    'hero.eyebrow': 'Analyse Rédactionnelle & Métriques LLM · 100% Confidentialité Locale',
    'hero.title': 'Compteur de Mots en Ligne &',
    'hero.titleGradient': 'Moteur de Lisibilité',
    'hero.description': 'Calculez mots, caractères, phrases, tokens IA et temps de lecture en temps réel. Analyse en mémoire de PDF/DOCX sans aucun appel serveur.',
    'hero.loadSample': 'Charger un Document Exemple',
    'hero.pastePrompt': 'ou collez votre texte directement ci-dessous ↓',
    
    // Metric Cards
    'metrics.words': 'Mots',
    'metrics.characters': 'Caractères',
    'metrics.sentences': 'Phrases',
    'metrics.paragraphs': 'Paragraphes',
    'metrics.readingTime': 'Temps de Lecture',
    'metrics.speakingTime': 'Temps de Parole',
    'metrics.pages': 'Pages',
    'metrics.noSpaces': 'sans espaces',
    'metrics.avgChars': 'Moyenne car/mot',
    'metrics.moreStats': 'Plus de Statistiques',
    
    // Actions & Editor
    'editor.placeholder': 'Commencez à taper ou collez votre texte ici (Ctrl+V). Glissez-déposez des fichiers .docx, .pdf ou .txt pour une analyse locale immédiate...',
    'editor.copy': 'Copier le texte',
    'editor.copied': 'Copié !',
    'editor.clear': 'Effacer',
    'editor.undo': 'Annuler',
    'editor.redo': 'Rétablir',
    'editor.sample': 'Exemple',
    'editor.case': 'Casse',
    'editor.export': 'Exporter',
    'editor.target': 'Objectif',
    'editor.dropTitle': 'Déposez votre fichier pour compter les mots localement',
    'editor.dropDesc': 'PDF, DOCX, TXT ou MD — 100% traité dans la mémoire de votre navigateur',
    
    // Tabs
    'tab.keywords': 'Densité des Mots-Clés',
    'tab.readability': 'Indices de Lisibilité',
    'tab.social': 'Limites Réseaux Sociaux',
    'tab.academic': 'Mode Mémoire Académique',
    'tab.style': 'Analyseur de Style',
    'tab.tokens': 'Compteur de Tokens IA',
    
    // SEO Sections
    'seo.editorialTitle': 'Guide Éditorial & Références Techniques',
    'seo.overviewHeading': 'Moteur Complet d\'Analyse Textuelle en Temps Réel',
    'seo.overviewBody': 'CleanWordCounter est conçu pour les auteurs, étudiants, journalistes et professionnels qui exigent une précision totale sans compromettre leur confidentialité. Aucun texte n\'est envoyé sur un serveur distant.',
    'seo.faqHeading': 'Foire Aux Questions & Guide de Comptage',
    'seo.faqSub': 'Tout savoir sur le calcul des mots, caractères, pages et temps de lecture.',
  },
  
  de: {
    // Navigation & Common
    'nav.wordCounter': 'Wörterzähler',
    'nav.tools': 'Tools',
    'nav.about': 'Über uns',
    'nav.contact': 'Kontakt',
    'nav.privacy': 'Datenschutz',
    'nav.terms': 'AGB',
    'nav.shortcuts': 'Tastenkürzel',
    'nav.find': 'Suchen',
    'trust.pill': '100% Lokal',
    'trust.title': '100% clientseitig. Ihr Text verlässt niemals Ihr Gerät.',
    
    // Meta / SEO
    'meta.title': 'Kostenloser Wörterzähler & Zeichenzähler – 100% Privat & Ohne Werbung',
    'meta.description': 'Zählen Sie Wörter, Zeichen, Sätze und Lesezeit in Echtzeit – völlig werbefrei. 100% privates Browser-Tool für Autoren und Studenten. Jetzt testen!',
    'meta.keywords': 'wörterzähler, zeichenzähler, wörter zählen, wörter online zählen, zeichen zählen mit leerzeichen, wörterzähler kostenlos, lesedauer berechnen',
    
    // Hero
    'hero.eyebrow': 'Professionelle Textanalyse & KI-Token-Zähler · 100% Lokaler Datenschutz',
    'hero.title': 'Kostenloser Online Wörterzähler &',
    'hero.titleGradient': 'Lesbarkeits-Engine',
    'hero.description': 'Wörter, Zeichen, Sätze, KI-Token und Lesezeit in Echtzeit analysieren. Sicheres Parsen von PDF- und Word-Dateien direkt im Browser.',
    'hero.loadSample': 'Beispieldokument laden',
    'hero.pastePrompt': 'oder Text direkt hier unten einfügen ↓',
    
    // Metric Cards
    'metrics.words': 'Wörter',
    'metrics.characters': 'Zeichen',
    'metrics.sentences': 'Sätze',
    'metrics.paragraphs': 'Absätze',
    'metrics.readingTime': 'Lesezeit',
    'metrics.speakingTime': 'Sprechzeit',
    'metrics.pages': 'Seiten',
    'metrics.noSpaces': 'ohne Leerzeichen',
    'metrics.avgChars': 'Ø Zeichen/Wort',
    'metrics.moreStats': 'Mehr Statistiken',
    
    // Actions & Editor
    'editor.placeholder': 'Tippen oder Text hier einfügen (Strg+V). Ziehen Sie .docx-, .pdf- oder .txt-Dateien für eine sofortige lokale Analyse hierher...',
    'editor.copy': 'Kopieren',
    'editor.copied': 'Kopiert!',
    'editor.clear': 'Löschen',
    'editor.undo': 'Rückgängig',
    'editor.redo': 'Wiederholen',
    'editor.sample': 'Beispiel',
    'editor.case': 'Groß/Klein',
    'editor.export': 'Exportieren',
    'editor.target': 'Zielvorgabe',
    'editor.dropTitle': 'Datei ablegen, um Wörter lokal zu zählen',
    'editor.dropDesc': 'PDF, DOCX, TXT oder MD — 100% im Arbeitsspeicher des Browsers verarbeitet',
    
    // Tabs
    'tab.keywords': 'Keyword-Dichte',
    'tab.readability': 'Lesbarkeits-Index',
    'tab.social': 'Social Media Limits',
    'tab.academic': 'Wissenschaftliche Arbeiten',
    'tab.style': 'Stilanalyse',
    'tab.tokens': 'KI-Token-Zähler',
    
    // SEO Sections
    'seo.editorialTitle': 'Redaktioneller Leitfaden & Technische Dokumentation',
    'seo.overviewHeading': 'Leistungsstarke Echtzeit-Textanalyse für Autoren & Studenten',
    'seo.overviewBody': 'CleanWordCounter wurde speziell für Autoren, Studenten und Entwickler entwickelt, die exakte Zählwerte und maximale Datensicherheit benötigen. Ihre Daten bleiben immer zu 100% lokal auf Ihrem Rechner.',
    'seo.faqHeading': 'Häufig gestellte Fragen & Wörter-Ratgeber',
    'seo.faqSub': 'Antworten zu Zeichenzählungen, Normseiten-Berechnung und Lesegeschwindigkeit.',
  },
  
  pt: {
    // Navigation & Common
    'nav.wordCounter': 'Contador de Palavras',
    'nav.tools': 'Ferramentas',
    'nav.about': 'Sobre',
    'nav.contact': 'Contato',
    'nav.privacy': 'Privacidade',
    'nav.terms': 'Termos',
    'nav.shortcuts': 'Atalhos',
    'nav.find': 'Buscar',
    'trust.pill': '100% Local',
    'trust.title': '100% no cliente. Seu texto nunca sai do seu dispositivo.',
    
    // Meta / SEO
    'meta.title': 'Contador de Palavras Grátis – 100% Privado, Instantâneo e Sem Anúncios',
    'meta.description': 'Conte palavras, caracteres, frases e tempo de leitura em tempo real sem anúncios. Ferramenta 100% privada no navegador para redatores e estudantes.',
    'meta.keywords': 'contador de palavras, contar palavras, contador de caracteres, contar caracteres, contador de palavras online gratis, calcular tempo de leitura',
    
    // Hero
    'hero.eyebrow': 'Análise de Escrita e Métricas de IA · 100% Privacidade Local',
    'hero.title': 'Contador de Palavras Online &',
    'hero.titleGradient': 'Motor de Legibilidade',
    'hero.description': 'Conte palavras, caracteres, frases, tokens de IA e tempo de leitura em tempo real. Processamento seguro de PDF/Word direto na memória.',
    'hero.loadSample': 'Carregar Documento de Exemplo',
    'hero.pastePrompt': 'ou cole o texto diretamente abaixo ↓',
    
    // Metric Cards
    'metrics.words': 'Palavras',
    'metrics.characters': 'Caracteres',
    'metrics.sentences': 'Frases',
    'metrics.paragraphs': 'Parágrafos',
    'metrics.readingTime': 'Tempo de Leitura',
    'metrics.speakingTime': 'Tempo de Fala',
    'metrics.pages': 'Páginas',
    'metrics.noSpaces': 'sem espaços',
    'metrics.avgChars': 'Média car/palavra',
    'metrics.moreStats': 'Mais Estatísticas',
    
    // Actions & Editor
    'editor.placeholder': 'Comece a digitar ou cole seu texto aqui (Ctrl+V). Arraste arquivos .docx, .pdf ou .txt para análise instantânea...',
    'editor.copy': 'Copiar Texto',
    'editor.copied': 'Copiado!',
    'editor.clear': 'Limpar',
    'editor.undo': 'Desfazer',
    'editor.redo': 'Refazer',
    'editor.sample': 'Exemplo',
    'editor.case': 'Maiúsc/Minúsc',
    'editor.export': 'Exportar',
    'editor.target': 'Meta de Palavras',
    'editor.dropTitle': 'Solte o arquivo para contar palavras localmente',
    'editor.dropDesc': 'PDF, DOCX, TXT ou MD — processamento 100% na memória do navegador',
    
    // Tabs
    'tab.keywords': 'Densidade de Palavras-Chave',
    'tab.readability': 'Índices de Legibilidade',
    'tab.social': 'Limites de Redes Sociais',
    'tab.academic': 'Modo Acadêmico (ABNT)',
    'tab.style': 'Analisador de Estilo',
    'tab.tokens': 'Contador de Tokens de IA',
    
    // SEO Sections
    'seo.editorialTitle': 'Guia Editorial & Análise Técnica',
    'seo.overviewHeading': 'Motor Completo de Análise de Texto em Tempo Real',
    'seo.overviewBody': 'O CleanWordCounter foi criado para escritores, acadêmicos e criadores de conteúdo que precisam de contagem precisa e total privacidade.',
    'seo.faqHeading': 'Perguntas Frequentes & Manual de Contagem',
    'seo.faqSub': 'Tudo sobre contagem de caracteres, conversão para laudas/páginas e limites para redes sociais.',
  },
  
  ko: {
    // Navigation & Common
    'nav.wordCounter': '글자수 세기',
    'nav.tools': '도구 모음',
    'nav.about': '소개',
    'nav.contact': '문의하기',
    'nav.privacy': '개인정보처리방침',
    'nav.terms': '이용약관',
    'nav.shortcuts': '단축키',
    'nav.find': '도구 검색',
    'trust.pill': '100% 로컬 실행',
    'trust.title': '100% 브라우저 로컬 처리. 입력하신 텍스트는 서버로 절대 전송되지 않습니다.',
    
    // Meta / SEO
    'meta.title': '무료 글자수 세기 & 단어수 계산기 – 100% 안전한 로컬 실행, 광고 없음',
    'meta.description': '실시간으로 글자수(공백 포함/제외), 단어수, 문장수, 읽기 시간을 계산하세요. 서버 전송 없는 100% 안전한 브라우저 텍스트 도구.',
    'meta.keywords': '글자수 세기, 글자수 계산기, 단어수 세기, 단어수 계산기, 자소서 글자수, 공백 포함 글자수, 공백 제외 글자수, 무료 글자수세기',
    
    // Hero
    'hero.eyebrow': '전문가용 텍스트 분석 & AI 토큰 카운터 · 100% 완벽한 보안',
    'hero.title': '무료 온라인 글자수 세기 &',
    'hero.titleGradient': '텍스트 분석 엔진',
    'hero.description': '공백 포함/제외 글자수, 단어수, 문장수, 읽기 시간, 원고지 분량을 실시간으로 즉시 확인하세요. PDF 및 Word 파일도 안전하게 분석합니다.',
    'hero.loadSample': '예시 문서 불러오기',
    'hero.pastePrompt': '또는 아래에 텍스트를 직접 입력하거나 붙여넣으세요 ↓',
    
    // Metric Cards
    'metrics.words': '단어수',
    'metrics.characters': '공백 포함 글자수',
    'metrics.sentences': '문장수',
    'metrics.paragraphs': '문단수',
    'metrics.readingTime': '읽기 시간',
    'metrics.speakingTime': '발표 시간',
    'metrics.pages': '원고지/A4 분량',
    'metrics.noSpaces': '공백 제외 글자수',
    'metrics.avgChars': '단어당 평균 글자',
    'metrics.moreStats': '상세 통계 보기',
    
    // Actions & Editor
    'editor.placeholder': '여기에 텍스트를 입력하거나 붙여넣으세요 (Ctrl+V). Word(.docx), PDF, TXT 파일을 끌어다 놓으면 즉시 분석됩니다...',
    'editor.copy': '텍스트 복사',
    'editor.copied': '복사 완료!',
    'editor.clear': '지우기',
    'editor.undo': '실행 취소',
    'editor.redo': '다시 실행',
    'editor.sample': '예문 보기',
    'editor.case': '대소문자 변환',
    'editor.export': '내보내기',
    'editor.target': '목표 글자수',
    'editor.dropTitle': '파일을 여기에 놓으면 즉시 글자수를 확인합니다',
    'editor.dropDesc': 'PDF, DOCX, TXT, MD 파일 — 외부 서버 전송 없이 브라우저 메모리에서 100% 안전하게 처리',
    
    // Tabs
    'tab.keywords': '키워드 밀도 분석',
    'tab.readability': '가독성 지수',
    'tab.social': 'SNS 글자수 제한',
    'tab.academic': '자기소개서 & 학술 모드',
    'tab.style': '문체 & 어조 분석',
    'tab.tokens': 'AI LLM 토큰 계산',
    
    // SEO Sections
    'seo.editorialTitle': '글자수 가이드 & 작성 가이드라인',
    'seo.overviewHeading': '자기소개서, 리포트, 블로그 글 작성을 위한 최적의 글자수 계산기',
    'seo.overviewBody': 'CleanWordCounter는 취업 준비생, 대학생, 전문 작가 및 마케터를 위해 개발된 무료 글자수 계산기입니다. 사용자의 모든 문서는 로컬 컴퓨터 메모리에서만 처리되므로 완벽한 보안을 보장합니다.',
    'seo.faqHeading': '자주 묻는 질문 (FAQ)',
    'seo.faqSub': '공백 포함/제외 기준, 원고지 매수 계산법, 자기소개서 글자수 제한에 대해 안내합니다.',
  },
  
  it: {
    // Navigation & Common
    'nav.wordCounter': 'Conteggio Parole',
    'nav.tools': 'Strumenti',
    'nav.about': 'Chi Siamo',
    'nav.contact': 'Contatti',
    'nav.privacy': 'Privacy',
    'nav.terms': 'Termini',
    'nav.shortcuts': 'Scorciatoie',
    'nav.find': 'Cerca',
    'trust.pill': '100% Locale',
    'trust.title': '100% lato client. Il tuo testo non lascia mai il tuo computer.',
    
    // Meta / SEO
    'meta.title': 'Conteggio Parole Gratis – 100% Privato, Istantaneo e Senza Pubblicità',
    'meta.description': 'Conta parole, caratteri, frasi e tempo di lettura in tempo reale senza pubblicità. Strumento 100% privato direttamente nel browser per scrittori e studenti.',
    'meta.keywords': 'conteggio parole, conta parole, conta caratteri, calcolo parole, conteggio parole online gratis, calcola tempo di lettura',
    
    // Hero
    'hero.eyebrow': 'Analisi Testuale & Conteggio Token IA · 100% Riservatezza Locale',
    'hero.title': 'Conteggio Parole Online &',
    'hero.titleGradient': 'Motore di Leggibilità',
    'hero.description': 'Conta parole, caratteri, frasi, token LLM e tempo di lettura in tempo reale. Lettura sicura di PDF e DOCX nella memoria del browser.',
    'hero.loadSample': 'Carica Testo di Esempio',
    'hero.pastePrompt': 'oppure incolla il tuo testo direttamente qui sotto ↓',
    
    // Metric Cards
    'metrics.words': 'Parole',
    'metrics.characters': 'Caratteri',
    'metrics.sentences': 'Frasi',
    'metrics.paragraphs': 'Paragrafi',
    'metrics.readingTime': 'Tempo di Lettura',
    'metrics.speakingTime': 'Tempo di Voce',
    'metrics.pages': 'Pagine',
    'metrics.noSpaces': 'senza spazi',
    'metrics.avgChars': 'Media car/parola',
    'metrics.moreStats': 'Altre Statistiche',
    
    // Actions & Editor
    'editor.placeholder': 'Inizia a digitare o incolla il tuo testo qui (Ctrl+V). Trascina file .docx, .pdf o .txt per un\'analisi immediata...',
    'editor.copy': 'Copia Testo',
    'editor.copied': 'Copiato!',
    'editor.clear': 'Cancella',
    'editor.undo': 'Annulla',
    'editor.redo': 'Ripristina',
    'editor.sample': 'Esempio',
    'editor.case': 'Maiusc/Minusc',
    'editor.export': 'Esporta',
    'editor.target': 'Obiettivo',
    'editor.dropTitle': 'Rilascia il file per contare le parole localmente',
    'editor.dropDesc': 'PDF, DOCX, TXT o MD — elaborazione al 100% nella memoria del tuo browser',
    
    // Tabs
    'tab.keywords': 'Densità Parole Chiave',
    'tab.readability': 'Indice di Leggibilità',
    'tab.social': 'Limiti Social Network',
    'tab.academic': 'Modalità Tesi Accademica',
    'tab.style': 'Analisi dello Stile',
    'tab.tokens': 'Contatore Token IA',
    
    // SEO Sections
    'seo.editorialTitle': 'Guida Editoriale & Analisi Tecnica',
    'seo.overviewHeading': 'Motore Completo di Analisi del Testo in Tempo Reale',
    'seo.overviewBody': 'CleanWordCounter è stato ideato per autori, studenti, traduttori e sviluppatori che necessitano di metriche precise nel massimo rispetto della privacy.',
    'seo.faqHeading': 'Domande Frequenti & Guida al Conteggio',
    'seo.faqSub': 'Tutto ciò che c\'è da sapere sul conteggio di parole, caratteri e cartelle editoriali.',
  },
} as const;
