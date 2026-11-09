import type { SupportedLang } from './ui';

export interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

export function getLocalizedFAQs(lang: SupportedLang): FAQItem[] {
  switch (lang) {
    case 'es':
      return [
        {
          category: 'Conteo General de Palabras y Caracteres',
          question: '¿Qué es un contador de palabras y cómo funciona?',
          answer: 'Un contador de palabras es una herramienta digital de análisis de texto que calcula en tiempo real el número exacto de palabras, caracteres (con y sin espacios), oraciones, párrafos y tiempo estimado de lectura. Funciona mediante algoritmos de procesamiento en memoria que analizan los límites de espacios y puntuación en tu navegador sin enviar datos a servidores externos.',
        },
        {
          category: 'Conteo General de Palabras y Caracteres',
          question: '¿Cuál es la diferencia entre conteo de palabras y conteo de caracteres?',
          answer: 'El conteo de palabras calcula las palabras individuales separadas por espacios (por ejemplo, "contador de palabras" son 3 palabras). El conteo de caracteres cuenta cada letra, número, signo y espacio (esa misma frase contiene 20 caracteres con espacios o 18 sin espacios).',
        },
        {
          category: 'Equivalencias y Páginas',
          question: '¿Cuántas palabras tiene una página estándar?',
          answer: 'En formato estándar (fuente Times New Roman o Arial de 12 puntos con interlineado doble), una página contiene aproximadamente 250 palabras. Con interlineado simple, una página contiene unas 500 palabras. Por lo tanto, un ensayo de 1.000 palabras equivale a unas 4 páginas a doble espacio.',
        },
        {
          category: 'Formatos y Documentos',
          question: '¿Puedo contar palabras en archivos PDF o Word (.docx) sin copiar y pegar?',
          answer: '¡Sí! Puedes arrastrar y soltar cualquier documento .docx, .pdf, .txt o .md directamente en el editor. Nuestro motor WebAssembly extrae y cuenta el texto al instante dentro de la memoria de tu dispositivo con total privacidad.',
        },
        {
          category: 'Métricas de Lectura y SEO',
          question: '¿Cómo se calculan el tiempo de lectura y el tiempo de oratoria?',
          answer: 'El tiempo de lectura se calcula con base en la velocidad promedio de lectura silenciosa en adultos (225 palabras por minuto). El tiempo de oratoria se calcula a 130 palabras por minuto, el estándar habitual para discursos, podcasts y presentaciones.',
        },
      ];

    case 'ja':
      return [
        {
          category: '文字数・単語数カウントの基礎',
          question: '文字数カウントツールとは何ですか？どのように計測されますか？',
          answer: '入力された文章の文字数（空白を含む・含まない）、単語数、文数、段落数、読了時間をリアルタイムで正確に計測するツールです。日本語の全角文字、半角文字、英数字、記号を自動判別し、ブラウザ内メモリでのみ高速処理します。',
        },
        {
          category: '文字数・原稿用紙換算',
          question: '原稿用紙（400字詰め）で何枚分になりますか？',
          answer: '一般的な400字詰め原稿用紙（20字×20行）の場合、改行や段落の空白を考慮すると、実質的な文字数は1枚あたり約300〜350文字程度となります。例えば1,200文字のレポートや小論文は原稿用紙およそ3〜4枚分に相当します。',
        },
        {
          category: 'レポート・ビジネス基準',
          question: '大学のレポートや就職活動のエントリーシート（ES）での文字数の目安は？',
          answer: '大学レポートでは「指定文字数の90%以上」が基本ルールとされます（例：2,000字指定なら1,800〜2,000字）。就職活動のES（自己PR・志望動機）でも、400字指定なら360〜400字（9割以上）埋めるのがマナーです。当ツールで目標文字数を設定して進捗を確認できます。',
        },
        {
          category: 'セキュリティとプライバシー',
          question: '入力した文章やアップロードしたPDF/Wordファイルは安全ですか？',
          answer: 'はい、完全に安全です。当ツールはすべての処理をユーザーのPCやスマートフォンのブラウザ内でのみ実行（クライアントサイド処理）しており、文章やファイルデータが外部サーバーへ送信・保存されることは一切ありません。機密文書や社内報告書も安心してご利用いただけます。',
        },
        {
          category: '読了時間・スピーチ時間',
          question: '読了時間とスピーチ（朗読）時間の計算基準は？',
          answer: '大人が日本語の文章を目で読む速度は1分間に約500〜600文字とされています。一方で結婚式やビジネスでのプレゼン・スピーチなど声に出して話す速度は、聞き取りやすい標準速度で1分間に約300文字（3分間スピーチなら約900〜1,000文字）が目安となります。',
        },
      ];

    case 'fr':
      return [
        {
          category: 'Comptage Général de Mots & Caractères',
          question: 'Qu\'est-ce qu\'un compteur de mots en ligne et comment fonctionne-t-il ?',
          answer: 'Un compteur de mots en ligne est un outil d\'analyse textuelle numérique qui calcule instantanément le nombre exact de mots, caractères (avec et sans espaces), phrases, paragraphes et le temps de lecture estimé. Il fonctionne directement dans votre navigateur sans téléverser vos données.',
        },
        {
          category: 'Règles et Équivalences',
          question: 'Combien de mots compte une page A4 standard ?',
          answer: 'En typographie académique standard (police 12 pt, interligne double), une page contient environ 250 mots. Avec un interligne simple, elle compte environ 500 mots. Un devoir de 1 500 mots représente ainsi environ 3 pages à simple interligne ou 6 pages à double interligne.',
        },
        {
          category: 'Formats Pris en Charge',
          question: 'Puis-je compter les mots d\'un fichier Word (.docx) ou PDF directement ?',
          answer: 'Absolument. Glissez et déposez simplement votre fichier .pdf, .docx, .txt ou .md dans l\'éditeur. Le texte est extrait en toute sécurité en mémoire locale via WebAssembly sans aucun appel réseau vers des serveurs distants.',
        },
        {
          category: 'Métriques de Lecture & Oralité',
          question: 'Comment sont estimés le temps de lecture et le temps de parole ?',
          answer: 'Le temps de lecture silencieuse est calculé sur la moyenne adulte de 225 mots par minute. Le temps d\'élocution ou de présentation orale est évalué à 130 mots par minute, la cadence idéale pour des discours clairs et audibles.',
        },
      ];

    case 'de':
      return [
        {
          category: 'Allgemeine Textanalyse',
          question: 'Was ist ein Online-Wörterzähler und wie funktioniert er?',
          answer: 'Ein Online-Wörterzähler analysiert Textblöcke in Echtzeit und ermittelt die präzise Anzahl an Wörtern, Zeichen (mit und ohne Leerzeichen), Sätzen, Absätzen sowie Lese- und Sprechzeiten. Alle Berechnungen erfolgen vollständig clientseitig im Browser.',
        },
        {
          category: 'Normseiten & Umrechnung',
          question: 'Wie viele Wörter entsprechen einer Normseite?',
          answer: 'Eine deutsche Normseite nach VG Wort umfasst 1.500 bis 1.800 Zeichen (inklusive Leerzeichen) bzw. etwa 250 bis 300 Wörter. Im akademischen Bereich entspricht eine Seite mit 1,5-fachem Zeilenabstand meist ca. 300 bis 350 Wörtern.',
        },
        {
          category: 'Datenschutz & Dokumente',
          question: 'Sind meine Texte und PDF/Word-Dokumente geschützt?',
          answer: 'Ja, zu 100%. Im Gegensatz zu herkömmlichen Plattformen werden bei CleanWordCounter keine Texte an externe Server übertragen. Das Parsen von PDF- und Word-Dateien geschieht vollkommen offline im Arbeitsspeicher Ihres Endgeräts.',
        },
        {
          category: 'Lesezeit & Vortragsdauer',
          question: 'Wie werden Lesezeit und Sprechzeit berechnet?',
          answer: 'Die Lesezeit basiert auf der durchschnittlichen stillen Lesegeschwindigkeit von 225 Wörtern pro Minute. Für gesprochene Vorträge, Referate und Präsentationen wird ein Standardtempo von 130 Wörtern pro Minute zugrunde gelegt.',
        },
      ];

    case 'pt':
      return [
        {
          category: 'Contagem Geral de Palavras e Caracteres',
          question: 'O que é um contador de palavras e como funciona?',
          answer: 'Um contador de palavras é uma ferramenta de análise textual que calcula em tempo real o total de palavras, caracteres (com e sem espaços), frases, parágrafos e tempo estimado de leitura diretamente no seu navegador, sem envio de dados para servidores.',
        },
        {
          category: 'Conversão para Páginas e Laudas',
          question: 'Quantas palavras cabem em uma página padrão?',
          answer: 'Em normas ABNT e acadêmicas (fonte 12 com espaçamento 1,5 ou duplo), uma lauda/página contém em média entre 250 e 300 palavras. Em espaçamento simples, alcança cerca de 500 palavras.',
        },
        {
          category: 'Arquivos e Privacidade',
          question: 'Posso contar palavras de arquivos Word e PDF com segurança?',
          answer: 'Sim! Arraste e solte arquivos .pdf, .docx ou .txt no editor. A extração é feita instantaneamente na memória local com privacidade garantida.',
        },
        {
          category: 'Métricas de Leitura',
          question: 'Como são calculados o tempo de leitura e fala?',
          answer: 'O tempo de leitura considera a média de 225 palavras por minuto. Já o tempo de apresentação ou fala utiliza 130 palavras por minuto, o ritmo padrão para palestras e vídeos.',
        },
      ];

    case 'ko':
      return [
        {
          category: '글자수 및 단어수 세기 기준',
          question: '글자수 세기 프로그램은 어떻게 동작하나요?',
          answer: '입력된 텍스트의 공백 포함 글자수, 공백 제외 글자수, 단어수, 문장수, 문단수 및 예상 읽기 시간을 실시간으로 계산합니다. 모든 분석은 사용자의 웹 브라우저 메모리 내에서 로컬로 처리되며 외부 서버로 전송되지 않습니다.',
        },
        {
          category: '자기소개서 & 공백 기준',
          question: '자기소개서 작성 시 공백 포함과 공백 제외 중 어떤 기준을 봐야 하나요?',
          answer: '대부분의 공기업 및 대기업 채용 사이트는 "공백 포함"을 기준으로 글자수 제한(예: 500자, 1,000자)을 둡니다. 단, 일부 채용 전형에서는 "공백 제외"를 명시하므로 공고문의 작성 요령을 확인해야 합니다. 본 도구는 두 가지 수치를 동시에 표시합니다.',
        },
        {
          category: '원고지 및 A4 분량 환산',
          question: 'A4 용지 한 장과 200자 원고지 몇 매에 해당하나요?',
          answer: 'A4 1장(글자 크기 10pt, 줄간격 160% 기준)은 약 1,500〜1,800자(단어 약 400〜500개)에 해당합니다. 200자 원고지 기준으로는 공백과 줄바꿈을 감안하여 약 8〜9매 내외입니다.',
        },
        {
          category: '문서 파일 보안',
          question: 'Word(.docx)나 PDF 문서를 올려도 내용이 유출되지 않나요?',
          answer: '네, 100% 안전합니다. WebAssembly 기술을 활용하여 사용자 브라우저 내부에서만 파일 텍스트를 추출하므로, 외부 서버에 데이터가 저장되거나 전송될 위험이 전혀 없습니다.',
        },
      ];

    case 'it':
      return [
        {
          category: 'Conteggio Generale di Parole e Caratteri',
          question: 'Cos\'è un contatore di parole e come funziona?',
          answer: 'Un contatore di parole online analizza un testo in tempo reale per determinare il numero esatto di parole, caratteri (con e senza spazi), frasi, paragrafi e tempo di lettura stimato, elaborando i dati esclusivamente nel browser.',
        },
        {
          category: 'Cartelle Editoriali e Pagine',
          question: 'A quante parole o caratteri corrisponde una cartella editoriale?',
          answer: 'In Italia, la cartella editoriale standard (per narrativa o saggistica) corrisponde tradizionalmente a 1.800 battute (spazi inclusi), suddivise in 30 righe da 60 battute, pari a circa 250-300 parole.',
        },
        {
          category: 'Privacy e Documenti',
          question: 'I miei testi o documenti PDF/Word sono al sicuro?',
          answer: 'Sì, al 100%. Nessun dato viene caricato su server esterni. L\'analisi dei file avviene localmente sul dispositivo dell\'utente per garantire la massima riservatezza.',
        },
      ];

    default:
      return [];
  }
}
