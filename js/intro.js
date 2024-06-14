// <canvas> 요소를 선택하고 2D 그래픽 컨텍스트를 가져옵니다.
const $c = document.querySelector("canvas");
const ctx = $c.getContext("2d");

// 버튼을 선택합니다.
const spinButton = document.getElementById("spinButton");

// .headCell 요소를 선택합니다.
const headCell = document.querySelector(".headCell");

// 메뉴 항목 배열과 각 메뉴 항목에 대한 배경 이미지 정보를 정의합니다.
const product = [
  { id: "product1", name: "A" },
  { id: "product2", name: "C" },
  { id: "product3", name: "B" },
];
const backUrl = [
  {
    url: "http://www.bdscast.co.kr/website01/web/index.html",
    description: "홈페이지A 입장하시겠습니까?",
  },
  {
    url: "http://www.bdscast.co.kr/website03/web/index.html",
    description: "홈페이지 C 입장하시겠습니까?",
  },
  {
    url: "http://www.bdscast.co.kr/website02/web/index.html",
    description: "페이지 B 입장하시겠습니까?",
  },
];

// 백그라운드 이미지 배열
// const backImg = [
//   { url: "img/point01.png" },
//   { url: "img/point02.png" },
//   { url: "img/point03.png" },
// ];

// 새로운 다이어그램을 그리는 함수입니다.
const newMake = () => {
  const [cw, ch] = [$c.width / 2, $c.height / 2];
  const arc = (Math.PI * 2) / product.length;

  // 배경 이미지를 로드하고 다이어그램을 그립니다.
  const loadImage = (src, callback) => {
    const img = new Image();
    img.onload = () => callback(img);
    img.src = src;
  };

  // 백그라운드 이미지 로드 함수
  // const loadBackgroundImage = (src, callback) => {
  //   const img = new Image();
  //   img.onload = () => callback(img);
  //   img.src = src;
  // };

  const drawSector = (imgObj, i) => {
    const startAngle = i * arc;
    const endAngle = (i + 1) * arc;

    // 섹터를 그리고 이미지를 채웁니다.
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cw, ch);
    ctx.arc(cw, ch, cw, startAngle, endAngle);
    ctx.closePath();
    ctx.clip();

    // 메뉴 항목에 해당하는 백그라운드 이미지 로드
    // loadBackgroundImage(backImg[i].url, (bgImg) => {
    //   ctx.drawImage(bgImg, 0, 0, $c.width, $c.height);
    // });

    ctx.restore();

    // 텍스트를 추가합니다.
    const angle = (i + 0.5) * arc;
    ctx.save();
    ctx.translate(
      cw + Math.cos(angle) * (cw - 50),
      ch + Math.sin(angle) * (ch - 50)
    );
    ctx.rotate(angle + Math.PI / 2);
    ctx.fillStyle = "#fff";
    ctx.font = "18px Pretendard";
    ctx.textAlign = "center";
    ctx.fillText(product[i].name, 0, 0);
    ctx.restore();
  };

  // 각 이미지에 대해 섹터를 그립니다.
  backUrl.forEach((imgInfo, i) => {
    loadImage(imgInfo.url, (img) => {
      imgInfo.img = img; // 이미지 객체를 imgInfo에 저장합니다.
      drawSector(imgInfo, i);
    });
  });
};

// 링크를 열기 위한 함수입니다.
const openLink = (url) => {
  window.open(url, "_blank");
};

// 회전 애니메이션을 수행하는 함수입니다.
const rotate = () => {
  // 버튼을 비활성화합니다.
  spinButton.disabled = true;

  $c.style.transition = "initial";
  $c.style.transform = "initial";

  setTimeout(() => {
    const ran = Math.floor(Math.random() * product.length);
    const arc = 360 / product.length;
    const rotate = ran * arc + 3600 + arc * 3 - arc / 2;

    $c.style.transition = "2s";
    $c.style.transform = `rotate(-${rotate}deg)`;

    setTimeout(() => {
      const imgInfo = backUrl[ran];
      const confirmation = confirm(
        `부동산캐스트 홈페이지 ${product[ran].name} 디자인 입니다.\n\n${imgInfo.description}`
      );
      if (confirmation) {
        openLink(imgInfo.url);
      }

      // 애니메이션이 끝난 후 버튼을 다시 활성화합니다.
      spinButton.disabled = false;
    }, 2000);
  }, 1);

  // .headCell의 transform 속성을 변경합니다.
  headCell.style.transform = "rotate(0deg)";
};

// 다이어그램을 처음에 생성합니다.
newMake();

// 버튼 클릭 시 회전 함수 호출
spinButton.addEventListener("click", rotate);
