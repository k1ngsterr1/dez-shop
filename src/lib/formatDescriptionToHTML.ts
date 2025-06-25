// src/lib/formatDescriptionToHTML.ts

/**
 * Formats a Russian product description string into beautiful HTML for display.
 * Highlights key sections and adds structure using regex and HTML tags.
 */
export function formatDescriptionToHTML(text: string): string {
  let html = text.replace(/\r\n/g, "\n");

  // Highlight composition (действующих веществ содержит ...)
  html = html.replace(
    /(действующих веществ содержит[^\.]*\.)/i,
    '<strong>Состав:</strong> <span class="text-sm">$1</span><br>'
  );
  // Highlight pH - улучшенная версия для полных предложений
  html = html.replace(
    /(pH\s+[^\.!?\n]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>pH:</strong> <span class="text-sm">$1</span><br>'
  );
  // Highlight shelf life (Срок годности ...) - полные предложения
  html = html.replace(
    /(Срок годности[^\.!?\n]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/gi,
    '<strong>Срок годности:</strong> <span class="text-sm">$1</span><br>'
  );
  // Highlight packaging (разливают во флаконы ...) - полные предложения
  html = html.replace(
    /(разливают во флаконы[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Упаковка:</strong> <span class="text-sm">$1</span><br>'
  );
  // Highlight activity (обладает антимикробной активностью ...) - полные предложения
  html = html.replace(
    /(обладает антимикробной активностью[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Активность:</strong> <span class="text-sm">$1</span><br>'
  );
  // Highlight other features (активно разрушает ...) - полные предложения
  html = html.replace(
    /(активно разрушает[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Особенности:</strong> <span class="text-sm">$1</span><br>'
  );
  // Highlight usage (применяется для ...) - полные предложения
  html = html.replace(
    /(применяется для[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Применение:</strong> <span class="text-sm">$1</span><br>'
  );
  // Highlight activity section (Антимикробная активность:)
  html = html.replace(
    /(Антимикробная активность:)/gi,
    "<br><strong>$1</strong><br>"
  );
  // Highlight toxicity section (Токсикологические характеристики:)
  html = html.replace(
    /(Токсикологические характеристики:)/gi,
    "<br><strong>$1</strong><br>"
  );
  // Highlight application areas (Области применения:)
  html = html.replace(/(Области применения:)/gi, "<br><strong>$1</strong><br>");
  // Highlight subheaders (Медицинские изделия:, Медтехника и оборудование:, Поверхности:, Выделения:, Объекты в очагах особо опасных инфекций:, Учреждения:, Фармацевтические производства:)
  html = html.replace(
    /(Медицинские изделия:|Медтехника и оборудование:|Поверхности:|Выделения:|Объекты в очагах особо опасных инфекций:|Учреждения:|Фармацевтические производства:)/g,
    '<br><span class="font-semibold">$1</span><br>'
  );
  // Format lists: lines starting with dash, bullet, or no indent after subheader
  html = html.replace(/<br>\s*([\-•])\s?([^<]+)/g, "<li>$2</li>");
  html = html.replace(
    /(<span class="font-semibold">[^<]+<\/span><br>)([\s\S]*?)(?=<br><span class="font-semibold">|<br><strong>|$)/g,
    (match, header, items) => {
      const lis = items
        .split(/<li>/)
        .slice(1)
        .map((i) => "<li>" + i)
        .join("");
      return header + '<ul class="list-disc pl-6 mt-2">' + lis + "</ul>";
    }
  );
  // Paragraphs: split by double newlines
  html = html.replace(/\n{2,}/g, "</p><p>");
  // Single newlines to <br>
  html = html.replace(/\n/g, "<br>");
  // Remove empty <p></p>
  html = html.replace(/<p><\/p>/g, "");
  // Ensure wrapped in <p>
  if (!/^<p>/.test(html)) html = `<p>${html}</p>`;
  // Remove empty subheaders (subheader followed only by <br> or whitespace or another subheader)
  html = html.replace(
    /(<span class="font-semibold">[^<:]+:<\/span><br>)(\s|<br>)*(?=(<span class="font-semibold">|<br><strong>|$))/g,
    ""
  );
  html = html.replace(
    /(<strong>Области применения:<\/strong><br>)(\s|<br>)*(?=(<span class=|<br><strong>|$))/g,
    ""
  );
  // Remove trailing empty subheaders (if at the end or only followed by other empty subheaders)
  html = html.replace(
    /(<span class="font-semibold">[^<:]+:<\/span><br>)(\s|<br>)*(?=(<\/p>|$))/g,
    ""
  );
  html = html.replace(
    /(<strong>Области применения:<\/strong><br>)(\s|<br>)*(?=(<\/p>|$))/g,
    ""
  );
  // Универсальные секции для моющих средств - улучшенные версии
  html = html.replace(
    /(Широко используется для очистки поверхностей[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Назначение:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Подходит для всех типов[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Типы поверхностей:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Может использоваться для стирки[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Стирка:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Предназначено для любой[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Перед дезинфекцией:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Может использоваться как для ручной, так и для машинной обработки поверхностей[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Обработка:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Подходит для мытья поверхности скорлупы яиц[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Яйца:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Универсальное слабощелочное, малопенящееся, моющее средство[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Тип:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Средство активно эмульгирует жиры[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Эмульгирование:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Незначительный уровень азота и серы[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Антибактериальный эффект:</strong> <span class="text-sm">$1</span><br>'
  );
  // --- Специальные секции для мыла и гелей --- (улучшенные версии)
  html = html.replace(
    /(гипоаллергенное и увлажняющее мыло[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Тип продукта:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(В состав средства входят[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Состав:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Не содержит[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Без добавок:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(рН средства [^\.!?\n]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>pH:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(предназначено для ежедневного мытья[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Назначение:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Подходит для чувствительной кожи[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Для чувствительной кожи:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Средство прошло клиническое исследование[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Клинические исследования:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(риск возникновения аллергических реакций[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Гипоаллергенность:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Средство рекомендуется к применению[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Рекомендации:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Средство по параметрам острой токсичности[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Токсичность:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Нанесение средства на скарифицированную кожу[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Безопасность:</strong> <span class="text-sm">$1</span><br>'
  );
  // --- Секции для антисептиков и гелей для рук --- (улучшенные версии)
  html = html.replace(
    /(Используется для гигиенической обработки рук[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Назначение:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Антисептик следует использовать[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Рекомендации по применению:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Готовый к применению спиртосодержащий антисептик[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Состав и форма:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Гелеобразная консистенция средства[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Консистенция:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(имеет широкий спектр применения[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Спектр применения:</strong> <span class="text-sm">$1</span><br>'
  );
  // --- Секции для дозирующих устройств ---
  html = html.replace(
    /(Устройство дозирующее локтевое настенное [^\n<]*|VD-\d+)/i,
    '<strong>Модель:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(/(Назначение:)/i, "<br><strong>Назначение:</strong><br>");
  html = html.replace(
    /(Предназначено для порционной подачи[^\.]*\.)/i,
    '<span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Особенности:)/i,
    "<br><strong>Особенности:</strong><br>"
  );
  html = html.replace(
    /(Имеет 4 режима точного дозирования[^\.]*\.)/i,
    '<span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Все конструктивные детали выполнены[^\.]*\.)/i,
    '<span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Металлические части выполнены[^\.]*\.)/i,
    '<span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Привод устройства — локтевой\.)/i,
    '<span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Режим работы — циклический, многократный\.)/i,
    '<span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Комплектация:)/i,
    "<br><strong>Комплектация:</strong><br>"
  );
  html = html.replace(
    /(Ванночка-каплесборник[^\.]*\.)/i,
    '<span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Конструкция:)/i,
    "<br><strong>Конструкция:</strong><br>"
  );
  html = html.replace(
    /(Обеспечивает удобство обработки[^\.]*\.)/i,
    '<span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Дозирующий механизм и ванночка-каплесборник[^\.]*\.)/i,
    '<span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Клавиши извлечения снабжены[^\.]*\.)/i,
    '<span class="text-sm">$1</span><br>'
  );
  // --- Секции для дезинфицирующих средств (ОПТИМАКС) --- (улучшенные версии)
  html = html.replace(
    /(Средство «ОПТИМАКС» — это многофункциональный дезинфицирующий концентрат[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Описание:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Физико-химические свойства и состав)/i,
    "<br><strong>$1</strong><br>"
  );
  html = html.replace(
    /(В составе «ОПТИМАКС» содержатся:)/i,
    "<strong>Состав:</strong><br>"
  );
  html = html.replace(/(основное действующее вещество[^;]*;)/gi, "<li>$1</li>");
  html = html.replace(/(неионогенные ПАВ[^;]*;)/gi, "<li>$1</li>");
  html = html.replace(
    /(ингибитор коррозии и кондиционер воды[^;]*;)/gi,
    "<li>$1</li>"
  );
  html = html.replace(
    /(краситель, вода питьевая деионизированная\.)/gi,
    "<li>$1</li>"
  );
  html = html.replace(
    /(Средство не горючее, взрывобезопасное[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Безопасность:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(/(Форма выпуска)/i, "<br><strong>$1</strong><br>");
  html = html.replace(
    /(«ОПТИМАКС» поставляется в:)/i,
    "<strong>Упаковка:</strong><br>"
  );
  html = html.replace(/(полимерных флаконах объёмом[^;]*;)/gi, "<li>$1</li>");
  html = html.replace(/(канистрах объёмом[^;]*;)/gi, "<li>$1</li>");
  html = html.replace(
    /(может быть укомплектовано устройствами[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/gi,
    "<li>$1</li>"
  );
  html = html.replace(
    /(Срок годности — 5 лет в невскрытой упаковке[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Срок годности:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Готовые растворы сохраняют свойства[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Рабочие растворы:</strong> <span class="text-sm">$1</span><br>'
  );

  // --- Секции для антисептика Оллсепт Про --- (улучшенные версии)
  html = html.replace(
    /(Средство «ОЛЛСЕПТ ПРО» представляет собой[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Описание:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Антисептик для рук всегда рекомендуется использовать[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Рекомендации по применению:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Антисептик «Оллсепт Про» оставляет приятное ощущение[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Преимущества:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Средство обладает бактерицидной, туберкулоцидной, вирулицидной[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Активность:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(В рецептуре средства используется[^\.]*?[\.!?](?:\s*[А-ЯЁ][^\.!?\n]*?[\.!?])*)/i,
    '<strong>Состав:</strong> <span class="text-sm">$1</span><br>'
  );
  // --- Секции для универсальных назначений и применения ---
  html = html.replace(
    /Используется:/i,
    "<br><strong>Используется:</strong><br>"
  );
  html = html.replace(
    /для обеззараживания поверхностей[^;\n]+[;\n]/gi,
    "<li>Для обеззараживания поверхностей в помещениях, жесткой мебели, поверхностей аппаратов, белья, посуды</li>"
  );
  html = html.replace(
    /для проведения текущих и генеральных уборок[^;\n]+[;\n]/gi,
    "<li>Для проведения текущих и генеральных уборок в ЛПУ, детских учреждениях, на предприятиях общественного питания, коммунальных объектах</li>"
  );
  html = html.replace(
    /для дезинфекции изделий медицинского назначения[^;\n]+[;\n]/gi,
    "<li>Для дезинфекции изделий медицинского назначения, в том числе совмещенной с предстерилизационной очисткой ручным и механизированным способом</li>"
  );
  html = html.replace(
    /для предварительной очистки эндоскопов[;\n]/gi,
    "<li>Для предварительной очистки эндоскопов</li>"
  );
  html = html.replace(
    /для обеззараживания воздуха[;\n]/gi,
    "<li>Для обеззараживания воздуха</li>"
  );
  // Обернуть в ul если есть хотя бы один li после "Используется:"
  html = html.replace(
    /(<strong>Используется:<\/strong><br>)([\s\S]*?)(?=(<br><strong>|$))/g,
    (match, header, items) => {
      if (/<li>/.test(items)) {
        return (
          header +
          '<ul class="list-disc pl-6 mt-2">' +
          items.replace(/<br>/g, "") +
          "</ul>"
        );
      }
      return match;
    }
  );
  // Убрать лишние точки в начале и конце li
  html = html.replace(
    /<li>\s*([^.\n<][^<]*?)\.*\s*<\/li>/g,
    (m, p1) => `<li>${p1.trim()}</li>`
  );
  // Убрать лишние точки после <span class="text-sm">...</span><br> если далее идёт <ul>
  html = html.replace(
    /(<span class="text-sm">[^<]+)\.<br>\s*<ul/g,
    "$1<br><ul"
  );
  // --- Секции для дезинфекции и стерилизации инструментов ---
  html = html.replace(
    /Используется для дезинфекции резинового и пластмассового оборудования[^.]+\./i,
    '<br/><br/><strong>Назначение:</strong> <span class="text-sm">$&</span><br>'
  );
  html = html.replace(
    /(<span class="font-semibold">[^<]+<\/span><br>)([\s\S]*?)(?=<br><span class="font-semibold">|<br><strong>|$)/g,
    (match, header, items) => {
      const lis = items
        .split(/<li>/)
        .slice(1)
        .map((i) => "<li>" + i)
        .join("");
      return header + '<ul class="list-disc pl-6 mt-2">' + lis + "</ul>";
    }
  );

  // Очистка неполных предложений и фрагментов
  html = cleanupIncompleteText(html);

  return html;
}

/**
 * Удаляет неполные предложения и фрагменты текста
 */
function cleanupIncompleteText(html: string): string {
  // Удаляем фрагменты предложений, которые обрываются на середине
  // Ищем текст, который не заканчивается точкой, восклицательным или вопросительным знаком
  html = html.replace(
    /(<span class="text-sm">)([^<]*?)([^\.!?])(<\/span><br>)/g,
    (match, start, content, lastChar, end) => {
      // Проверяем, является ли это полным предложением
      const trimmedContent = content.trim();
      if (trimmedContent.length < 10 || !trimmedContent.match(/^[А-ЯЁ]/)) {
        return ""; // Удаляем фрагмент
      }
      // Если предложение выглядит полным, добавляем точку
      return start + trimmedContent + "." + end;
    }
  );

  // Удаляем пустые секции
  html = html.replace(
    /<strong>[^<]+:<\/strong>\s*<span class="text-sm">\s*<\/span><br>/g,
    ""
  );

  // Убираем пунктуацию с новой строки (двоеточие, точка, запятая, точка с запятой)
  html = html.replace(/(<\/strong>)\s*<br>\s*([:.;,])/g, "$1$2");
  html = html.replace(/(<\/span>)\s*<br>\s*([:.;,])/g, "$1$2");
  html = html.replace(/(\w+)\s*<br>\s*([:.;,])/g, "$1$2");

  // Убираем пробелы перед пунктуацией после переноса строки
  html = html.replace(/<br>\s*([:.;,])/g, "$1<br>");

  // Удаляем двойные <br>
  html = html.replace(/<br>\s*<br>/g, "<br>");

  // Удаляем <br> в начале и конце
  html = html.replace(/^<br>|<br>$/g, "");

  return html;
}
