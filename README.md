# 리그 오브 레전드 챔피언 정보 웹

리그 오브 레전드 챔피언 정보를 불러오고 정제하는 JavaScript API와 웹 인터페이스입니다.

## 기능

- 🏆 챔피언 이름으로 실시간 정보 검색
- 📊 상세한 스탯 정보 (체력, 공격력, 방어력 등)
- ⚔️ 스킬 정보 (패시브, Q, W, E, R)
- 💡 게임 팁 (아군/적군 팁)
- 🎨 스킨 정보
- 🎯 반응형 웹 디자인
- 🔍 실시간 검색 기능

## 파일 구조

```
lol-champion-info-web/
├── index.html          # 메인 웹 페이지
├── example.html        # API 사용 예시
├── champion-api.js     # 챔피언 API 클래스
├── styles.css          # 스타일시트
└── README.md           # 프로젝트 설명서
```

## 사용법

### 1. 기본 사용법

```javascript
// ChampionAPI 클래스 인스턴스 생성
const championAPI = new ChampionAPI();

// 챔피언 정보 불러오기
const olafInfo = await championAPI.getChampionInfo('Olaf');

// 콘솔에 정보 출력
championAPI.displayChampionInfo(olafInfo);
```

### 2. HTML에 정보 표시

```javascript
// HTML 요소에 챔피언 정보 표시
championAPI.displayChampionInfoInHTML(olafInfo, 'champion-container');
```

### 3. 정제된 데이터 구조

```javascript
{
  // 기본 정보
  id: "Olaf",
  name: "올라프",
  title: "광전사",
  key: "2",
  
  // 이미지 정보
  image: {
    full: "https://ddragon.leagueoflegends.com/cdn/15.11.1/img/champion/Olaf.png",
    loading: "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Olaf_0.jpg"
  },
  
  // 스탯 정보
  stats: {
    hp: 645,
    hpperlevel: 119,
    attackdamage: 68,
    attackdamageperlevel: 4.7,
    armor: 35,
    armorperlevel: 4.2,
    // ... 기타 스탯
  },
  
  // 스킬 정보
  spells: [
    {
      name: "역류",
      description: "올라프가 지정한 곳에 도끼를 던져...",
      cooldown: [9, 9, 9, 9, 9],
      cost: [50, 55, 60, 65, 70],
      range: [700, 700, 700, 700, 700]
    }
    // ... 기타 스킬
  ],
  
  // 패시브 정보
  passive: {
    name: "광전사의 분노",
    description: "올라프가 잃은 체력에 비례해..."
  },
  
  // 팁 정보
  allytips: ["올라프는 광전사의 분노, 광포한 공격..."],
  enemytips: ["올라프는 생명력이 낮을수록 위험해집니다..."],
  
  // 스킨 정보
  skins: [
    { num: 0, name: "default", chromas: false },
    { num: 1, name: "악에 물든 올라프", chromas: false }
    // ... 기타 스킨
  ]
}
```

## API 메서드

### `getChampionInfo(championName)`
챔피언 이름으로 정보를 불러옵니다.

**매개변수:**
- `championName` (string): 챔피언 이름 (영문, 예: 'Olaf', 'Ahri', 'Yasuo')

**반환값:**
- `Promise<Object>`: 정제된 챔피언 정보 객체

### `displayChampionInfo(championInfo)`
챔피언 정보를 콘솔에 출력합니다.

**매개변수:**
- `championInfo` (Object): 정제된 챔피언 정보 객체

### `displayChampionInfoInHTML(championInfo, containerId)`
챔피언 정보를 HTML 요소에 표시합니다.

**매개변수:**
- `championInfo` (Object): 정제된 챔피언 정보 객체
- `containerId` (string): 표시할 HTML 요소의 ID (기본값: 'champion-info')

## 실행 방법

1. 모든 파일을 같은 디렉토리에 저장
2. 웹 서버에서 실행하거나 로컬에서 `index.html` 열기
3. 브라우저에서 `index.html` 접속

## 지원하는 챔피언

모든 리그 오브 레전드 챔피언을 지원합니다. 챔피언 이름은 영문으로 입력해야 합니다.

**예시:**
- `Olaf` (올라프)
- `Ahri` (아리)
- `Yasuo` (야스오)
- `Lux` (럭스)
- `Garen` (가렌)

## 데이터 소스

이 프로젝트는 [Data Dragon API](https://ddragon.leagueoflegends.com/)를 사용하여 리그 오브 레전드 챔피언 정보를 가져옵니다.

## 브라우저 지원

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 기여하기

버그 리포트나 기능 제안은 이슈를 통해 제출해주세요.

---

**참고:** 이 프로젝트는 교육 목적으로 제작되었으며, 리그 오브 레전드는 Riot Games의 상표입니다. 