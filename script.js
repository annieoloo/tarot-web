// --- 22張大牌（Major Arcana）---
// 結構：num, name, upright（正位重點）, reversed（逆位重點）
const majorArcana = [
  { num: 0,  name: "愚者",     upright: "新開始、自由、信任直覺、勇於嘗試", reversed: "衝動、準備不足、逃避責任、方向感不足、魯莽行事" },
  { num: 1,  name: "魔術師",   upright: "資源到位、行動窗口、溝通與發揮影響力", reversed: "心有餘而力不足、誤用資源、口號多於行動" },
  { num: 2,  name: "女祭司",   upright: "直覺、內在智慧、觀察而不急於表態", reversed: "壓抑情緒、資訊不透明、過度猜測" },
  { num: 3,  name: "皇后",     upright: "滋養、創造力、關係與環境的豐盛", reversed: "過度付出、界線不清、懶散停滯、溺愛" },
  { num: 4,  name: "皇帝",     upright: "結構、紀律、策略與掌控", reversed: "僵化、控制慾、權威造成壓力、大男人主義" },
  { num: 5,  name: "教皇",     upright: "規範、傳承、制度與指導", reversed: "質疑傳統、另闢蹊徑、抗拒框架、不想被既有規則束縛" },
  { num: 6,  name: "戀人",     upright: "選擇與共識、連結與吸引、價值對齊、但也有選擇議題", reversed: "猶豫不決、價值衝突、關係不對等、逃避面對選擇" },
  { num: 7,  name: "戰車",     upright: "推進、意志力、目標明確、克服阻力", reversed: "分心、拉扯、方向不穩、失控" },
  { num: 8,  name: "力量",     upright: "溫柔的力量、自我調節、勇氣與耐心", reversed: "自我懷疑、情緒失衡、勉強用力" },
  { num: 9,  name: "隱者",     upright: "內省、釐清、尋找內在答案", reversed: "封閉、過度退縮、與人疏離" },
  { num: 10, name: "命運之輪", upright: "轉機、週期變化、時機來臨", reversed: "時運不濟、卡在舊循環、抗拒變化" },
  { num: 11, name: "正義",     upright: "公平、因果、決策需客觀", reversed: "偏頗、資訊不全、決策失衡" },
  { num: 12, name: "吊人",     upright: "換位思考、暫停與等待、犧牲換突破", reversed: "無謂消耗、拖延、執著舊觀點、不想犧牲、逃避所面臨的課題" },
  { num: 13, name: "死神",     upright: "結束舊局、清理、重生契機、面臨轉換契機", reversed: "不願放下、舊能量殘留、轉化延遲" },
  { num: 14, name: "節制",     upright: "調和、節奏拿捏、整合資源、情緒調節良好", reversed: "失衡、過度/不足、步調不協調" },
  { num: 15, name: "惡魔",     upright: "慾望與束縛、交易代價、覺察成癮", reversed: "鬆綁、離開不健康依附、看見真相" },
  { num: 16, name: "塔",       upright: "突變、真相揭露、必要的拆解、突來的巨變", reversed: "延後爆點、小震盪提醒、修補還來得及、不想有太大改變" },
  { num: 17, name: "星星",     upright: "希望、療癒、長期信心與指引", reversed: "信念動搖、短期焦慮、看不見光" },
  { num: 18, name: "月亮",     upright: "潛意識、模糊與想像、需要等待釐清、沒有安全感", reversed: "迷霧散去、誤會解除、直面恐懼" },
  { num: 19, name: "太陽",     upright: "清晰、成功、活力與坦誠、勇敢面對挑戰、不怕變化", reversed: "短暫受阻、過度樂觀或自我中心" },
  { num: 20, name: "審判",     upright: "覺醒、總結與召喚、回應內在呼喚、有把過去的課題好好消化", reversed: "遲疑、錯過召喚、舊課題未結清" },
  { num: 21, name: "世界",     upright: "完成、整合、階段性圓滿與開展", reversed: "差臨門一腳、收尾不全、循環未閉合、還未完結" }
];
// 位置標籤（抽 3 張時）
const positions = ["過去", "現在", "未來"];

// ======== DOM 取得 ========
const btn = document.getElementById("drawBtn");
const cardsDiv = document.getElementById("cards");
const questionInput = document.getElementById("question");
const countSelect = document.getElementById("count");
const allowReversed = document.getElementById("allowReversed");

// ======== 小工具 ========
// 補零
const pad2 = (n) => String(n).padStart(2, "0");
// 依 num 產生圖片路徑
const imagePathFor = (num) => `images/major_${pad2(num)}.png`;

// 洗牌
function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}

// 抽 n 張（不重複），並決定是否逆位
function draw(n=3){
  return shuffle(majorArcana).slice(0, n).map(card => ({
    ...card,
    isReversed: allowReversed && allowReversed.checked ? Math.random() < 0.5 : false
  }));
}

// ======== Render ========
function render(cards){
  cardsDiv.innerHTML = "";
  const count = Number(countSelect ? countSelect.value : 3);

  cards.forEach((card, idx) => {
    const cardEl = document.createElement("div");
    cardEl.className = "card" + (card.isReversed ? " reversed" : "");

    // 位置
    const pos = document.createElement("div");
    pos.className = "card__pos";
    pos.textContent = (count === 3 ? `${positions[idx]}｜` : "") + `第 ${idx+1} 張`;
    cardEl.appendChild(pos);

    // 圖片
    const imgWrap = document.createElement("div");
    imgWrap.className = "card__imgwrap";
    const img = document.createElement("img");
    img.className = "card__img";
    img.alt = `${card.num} ${card.name}`;
    img.src = imagePathFor(card.num);
    img.loading = "lazy";
    img.onerror = () => {
      imgWrap.innerHTML = `<div style="padding:8px;font-size:12px;color:#8b85a9;">找不到圖片：major_${pad2(card.num)}.png</div>`;
    };
    imgWrap.appendChild(img);
    cardEl.appendChild(imgWrap);

    // 標題
    const title = document.createElement("div");
    title.className = "card__title";
    const badge = `<span class="badge">${card.isReversed ? "逆位" : "正位"}</span>`;
    title.innerHTML = `${card.num} ${card.name} ${badge}`;
    cardEl.appendChild(title);

    // 牌義（注意：顯示文字只取 upright / reversedText，絕不直接顯示布林）
    const meaning = document.createElement("p");
    meaning.className = "card__meaning";
    meaning.textContent = card.isReversed ? (card.reversed || "") : (card.upright || "");
    cardEl.appendChild(meaning);

    // 點擊卡片：切換顯示的牌義（僅文字切換，不旋轉圖片）
    cardEl.addEventListener("click", () => {
      const showingUpright = meaning.textContent === (card.upright || "");
if (showingUpright) {
  meaning.textContent = card.reversed || "";
  title.innerHTML = `${card.num} ${card.name} <span class="badge">逆位</span>`;
} else {
  meaning.textContent = card.upright || "";
  title.innerHTML = `${card.num} ${card.name} <span class="badge">正位</span>`;
}

    });

    cardsDiv.appendChild(cardEl);
  });
}

// ======== 事件 ========
btn && btn.addEventListener("click", () => {
  const n = Number(countSelect ? countSelect.value : 3);
  const drawn = draw(n);
  // 問題目前不影響抽牌邏輯，僅作紀錄（之後可擴充寫入歷史）
  console.log("Question:", (questionInput && questionInput.value || "").trim());
  render(drawn);
});

// 初始：預設抽 3 張
render(draw(3));