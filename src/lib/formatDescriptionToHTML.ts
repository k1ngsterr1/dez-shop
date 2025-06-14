// src/lib/formatDescriptionToHTML.ts

/**
 * Formats a Russian product description string into beautiful HTML for display.
 * Highlights key sections and adds structure using regex and HTML tags.
 */
export function formatDescriptionToHTML(text: string): string {
  let html = text.replace(/\r\n/g, "\n");

  // Highlight composition (действующих веществ содержит ...)
  html = html.replace(
    /(действующих веществ содержит[^.]+\.)/i,
    '<strong>Состав:</strong> <span class="text-sm">$1</span><br>'
  );
  // Highlight pH
  html = html.replace(
    /(pH [^.!?\n]+[.!?])/i,
    '<strong>pH:</strong> <span class="text-sm">$1</span><br>'
  );
  // Highlight shelf life (Срок годности ...)
  html = html.replace(
    /(Срок годности[^.!?\n]+[.!?])/gi,
    '<strong>Срок годности:</strong> <span class="text-sm">$1</span><br>'
  );
  // Highlight packaging (разливают во флаконы ...)
  html = html.replace(
    /(разливают во флаконы[^.]+\.)/i,
    '<strong>Упаковка:</strong> <span class="text-sm">$1</span><br>'
  );
  // Highlight activity (обладает антимикробной активностью ...)
  html = html.replace(
    /(обладает антимикробной активностью[^.]+\.)/i,
    '<strong>Активность:</strong> <span class="text-sm">$1</span><br>'
  );
  // Highlight other features (активно разрушает ...)
  html = html.replace(
    /(активно разрушает[^.]+\.)/i,
    '<strong>Особенности:</strong> <span class="text-sm">$1</span><br>'
  );
  // Highlight usage (применяется для ...)
  html = html.replace(
    /(применяется для[^.]+\.)/i,
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
  // Универсальные секции для моющих средств
  html = html.replace(
    /(Широко используется для очистки поверхностей[^.]+\.)/i,
    '<strong>Назначение:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Подходит для всех типов[^.]+\.)/i,
    '<strong>Типы поверхностей:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Может использоваться для стирки[^.]+\.)/i,
    '<strong>Стирка:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Предназначено для любой[^.]+\.)/i,
    '<strong>Перед дезинфекцией:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Может использоваться как для ручной, так и для машинной обработки поверхностей\.)/i,
    '<strong>Обработка:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Подходит для мытья поверхности скорлупы яиц[^.]+\.)/i,
    '<strong>Яйца:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Универсальное слабощелочное, малопенящееся, моющее средство\.)/i,
    '<strong>Тип:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Средство активно эмульгирует жиры[^.]+\.)/i,
    '<strong>Эмульгирование:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Незначительный уровень азота и серы[^.]+\.)/i,
    '<strong>Антибактериальный эффект:</strong> <span class="text-sm">$1</span><br>'
  );
  // --- Специальные секции для мыла и гелей ---
  html = html.replace(
    /(гипоаллергенное и увлажняющее мыло[^.]+\.)/i,
    '<strong>Тип продукта:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(В состав средства входят[^.]+\.)/i,
    '<strong>Состав:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Не содержит[^.]+\.)/i,
    '<strong>Без добавок:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(рН средства [^.!?\n]+[.!?])/i,
    '<strong>pH:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(предназначено для ежедневного мытья[^.]+\.)/i,
    '<strong>Назначение:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Подходит для чувствительной кожи[^.]+\.)/i,
    '<strong>Для чувствительной кожи:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Средство прошло клиническое исследование[^.]+\.)/i,
    '<strong>Клинические исследования:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(риск возникновения аллергических реакций[^.]+\.)/i,
    '<strong>Гипоаллергенность:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Средство рекомендуется к применению[^.]+\.)/i,
    '<strong>Рекомендации:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Средство по параметрам острой токсичности[^.]+\.)/i,
    '<strong>Токсичность:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Нанесение средства на скарифицированную кожу[^.]+\.)/i,
    '<strong>Безопасность:</strong> <span class="text-sm">$1</span><br>'
  );
  // --- Секции для антисептиков и гелей для рук ---
  html = html.replace(
    /(Используется для гигиенической обработки рук[^.]+\.)/i,
    '<strong>Назначение:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Антисептик следует использовать[^.]+\.)/i,
    '<strong>Рекомендации по применению:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Готовый к применению спиртосодержащий антисептик[^.]+\.)/i,
    '<strong>Состав и форма:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Гелеобразная консистенция средства[^.]+\.)/i,
    '<strong>Консистенция:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(имеет широкий спектр применения\.)/i,
    '<strong>Спектр применения:</strong> <span class="text-sm">$1</span><br>'
  );
  // --- Секции для дозирующих устройств ---
  html = html.replace(
    /(Устройство дозирующее локтевое настенное [^\n<]+|VD-\d+)/i,
    '<strong>Модель:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(/(Назначение:)/i, "<br><strong>Назначение:</strong><br>");
  html = html.replace(
    /(Предназначено для порционной подачи[^.]+\.)/i,
    '<span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Особенности:)/i,
    "<br><strong>Особенности:</strong><br>"
  );
  html = html.replace(
    /(Имеет 4 режима точного дозирования[^.]+\.)/i,
    '<span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Все конструктивные детали выполнены[^.]+\.)/i,
    '<span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Металлические части выполнены[^.]+\.)/i,
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
    /(Ванночка-каплесборник[^.]+\.)/i,
    '<span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Конструкция:)/i,
    "<br><strong>Конструкция:</strong><br>"
  );
  html = html.replace(
    /(Обеспечивает удобство обработки[^.]+\.)/i,
    '<span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Дозирующий механизм и ванночка-каплесборник[^.]+\.)/i,
    '<span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Клавиши извлечения снабжены[^.]+\.)/i,
    '<span class="text-sm">$1</span><br>'
  );
  // --- Секции для антисептика Оллсепт Про ---
  html = html.replace(
    /(Средство «ОЛЛСЕПТ ПРО» представляет собой[^.]+\.)/i,
    '<strong>Описание:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Антисептик для рук всегда рекомендуется использовать[^.]+\.)/i,
    '<strong>Рекомендации по применению:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Антисептик «Оллсепт Про» оставляет приятное ощущение[^.]+\.)/i,
    '<strong>Преимущества:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(Средство обладает бактерицидной, туберкулоцидной, вирулицидной[^.]+\.)/i,
    '<strong>Активность:</strong> <span class="text-sm">$1</span><br>'
  );
  html = html.replace(
    /(В рецептуре средства используется[^.]+\.)/i,
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
  return html;
}
