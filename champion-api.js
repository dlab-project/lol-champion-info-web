// 챔피언 정보를 불러오고 정제하는 클래스
class ChampionAPI {
    constructor() {
        this.baseURL = 'https://ddragon.leagueoflegends.com/cdn/15.11.1/data/ko_KR/champion/';
        this.imageBaseURL = 'https://ddragon.leagueoflegends.com/cdn/15.11.1/img/champion/';
        this.loadingImageBaseURL = 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/';
        this.spellImageBaseURL = 'https://ddragon.leagueoflegends.com/cdn/15.11.1/img/spell/';
        
        // 한국어-영문 챔피언 이름 매핑
        this.championNameMapping = {
            // A
            '아트록스': 'Aatrox',
            '아리': 'Ahri',
            '애니비아': 'Anivia',
            '애니': 'Annie',
            '아펠리오스': 'Aphelios',
            '애쉬': 'Ashe',
            '아우렐리온 솔': 'AurelionSol',
            '아지르': 'Azir',
            
            // B
            '바드': 'Bard',
            '블리츠크랭크': 'Blitzcrank',
            '브랜드': 'Brand',
            '브라움': 'Braum',
            
            // C
            '케이틀린': 'Caitlyn',
            '카밀': 'Camille',
            '카시오페아': 'Cassiopeia',
            '초가스': 'Chogath',
            '코르키': 'Corki',
            
            // D
            '다리우스': 'Darius',
            '다이애나': 'Diana',
            '드레이븐': 'Draven',
            '문도 박사': 'DrMundo',
            
            // E
            '이블린': 'Evelynn',
            '이즈리얼': 'Ezreal',
            
            // F
            '피들스틱': 'Fiddlesticks',
            '피오라': 'Fiora',
            '피즈': 'Fizz',
            
            // G
            '갈리오': 'Galio',
            '갱플랭크': 'Gangplank',
            '가렌': 'Garen',
            '그라가스': 'Gragas',
            '그레이브즈': 'Graves',
            '그웬': 'Gwen',
            
            // H
            '헤카림': 'Hecarim',
            '하이머딩거': 'Heimerdinger',
            
            // I
            '일라오이': 'Illaoi',
            '이렐리아': 'Irelia',
            '이렐리': 'Irelia',
            '아이번': 'Ivern',
            
            // J
            '잔나': 'Janna',
            '자르반 4세': 'JarvanIV',
            '자르반': 'JarvanIV',
            '자야': 'Jax',
            '제이스': 'Jayce',
            '진': 'Jhin',
            '징크스': 'Jinx',
            
            // K
            '카이사': 'Kaisa',
            '칼리스타': 'Kalista',
            '카르마': 'Karma',
            '카서스': 'Karthus',
            '카사딘': 'Kassadin',
            '케타리나': 'Katarina',
            '케일': 'Kayle',
            '케인': 'Kayn',
            '케넨': 'Kennen',
            '카직스': 'Khazix',
            '킨드레드': 'Kindred',
            '클레드': 'Kled',
            '코그모': 'KogMaw',
            
            // L
            '르블랑': 'Leblanc',
            '리 신': 'LeeSin',
            '리신': 'LeeSin',
            '레오나': 'Leona',
            '리산드라': 'Lissandra',
            '루시안': 'Lucian',
            '룰루': 'Lulu',
            '럭스': 'Lux',
            
            // M
            '말파이트': 'Malphite',
            '말자하': 'Malzahar',
            '마오카이': 'Maokai',
            '마스터 이': 'MasterYi',
            '마스터이': 'MasterYi',
            '미스 포츈': 'MissFortune',
            '모르가나': 'Morgana',
            '모데카이저': 'Mordekaiser',
            
            // N
            '나미': 'Nami',
            '나서스': 'Nasus',
            '노틸러스': 'Nautilus',
            '니달리': 'Nidalee',
            '녹턴': 'Nocturne',
            '누누와 윌럼프': 'Nunu',
            '누누': 'Nunu',
            
            // O
            '올라프': 'Olaf',
            '오리아나': 'Orianna',
            
            // P
            '판테온': 'Pantheon',
            '파이크': 'Pyke',
            
            // Q
            '퀸': 'Quinn',
            
            // R
            '라칸': 'Rakan',
            '람머스': 'Rammus',
            '렉사이': 'RekSai',
            '렐': 'Rell',
            '렌가': 'Rengar',
            '리븐': 'Riven',
            '럼블': 'Rumble',
            '라이즈': 'Ryze',
            
            // S
            '사미라': 'Samira',
            '세주아니': 'Sejuani',
            '세나': 'Senna',
            '세라핀': 'Seraphine',
            '세트': 'Sett',
            '샤코': 'Shaco',
            '샤이바나': 'Shyvana',
            '싱드라': 'Syndra',
            '사이온': 'Sion',
            '시비르': 'Sivir',
            '스카너': 'Skarner',
            '소나': 'Sona',
            '소라카': 'Soraka',
            '스웨인': 'Swain',
            '시라': 'Syndra',
            
            // T
            '탈론': 'Talon',
            '탈리야': 'Taliyah',
            '타릭': 'Taric',
            '티모': 'Teemo',
            '쓰레쉬': 'Thresh',
            '트런들': 'Trundle',
            '트린다미어': 'Tryndamere',
            '트위스티드 페이트': 'TwistedFate',
            '트위치': 'Twitch',
            
            // U
            '우디르': 'Udyr',
            '우르곳': 'Urgot',
            
            // V
            '바루스': 'Varus',
            '베인': 'Vayne',
            '베이가': 'Veigar',
            '벨베스': 'Velkoz',
            '벡스': 'Vex',
            '비에고': 'Viego',
            '빅토르': 'Viktor',
            '블라디미르': 'Vladimir',
            '볼리베어': 'Volibear',
            
            // W
            '워윅': 'Warwick',
            '워윅': 'Warwick',
            '렉사이': 'RekSai',
            
            // X
            '신 짜오': 'XinZhao',
            '신짜오': 'XinZhao',
            
            // Y
            '야스오': 'Yasuo',
            '요네': 'Yone',
            '요릭': 'Yorick',
            '유미': 'Yuumi',
            
            // Z
            '자크': 'Zac',
            '제드': 'Zed',
            '제라스': 'Ziggs',
            '질리언': 'Zilean',
            '조이': 'Zoe',
            '자이라': 'Zyra'
        };
    }

    /**
     * 한국어 챔피언 이름을 영문으로 변환합니다
     * @param {string} championName - 챔피언 이름 (한국어 또는 영문)
     * @returns {string} 영문 챔피언 이름
     */
    convertToEnglishName(championName) {
        const normalizedName = championName.trim();
        
        // 이미 영문인 경우 첫 글자만 대문자로 변환하여 반환
        if (!/[가-힣]/.test(normalizedName)) {
            return normalizedName.charAt(0).toUpperCase() + normalizedName.slice(1).toLowerCase();
        }
        
        // 한국어-영문 매핑에서 찾기
        const englishName = this.championNameMapping[normalizedName];
        if (englishName) {
            return englishName;
        }
        
        // 매핑에 없는 경우 원본 반환 (API에서 처리)
        return normalizedName;
    }

    /**
     * 챔피언 이름으로 챔피언 정보를 불러옵니다
     * @param {string} championName - 챔피언 이름 (한국어 또는 영문)
     * @returns {Promise<Object>} 정제된 챔피언 정보
     */
    async getChampionInfo(championName) {
        try {
            const englishName = this.convertToEnglishName(championName);
            const response = await fetch(`${this.baseURL}${englishName}.json`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return this.refineChampionData(data.data[englishName]);
        } catch (error) {
            console.error('챔피언 정보를 불러오는 중 오류가 발생했습니다:', error);
            throw error;
        }
    }

    /**
     * 챔피언 데이터를 정제합니다
     * @param {Object} championData - 원본 챔피언 데이터
     * @returns {Object} 정제된 챔피언 정보
     */
    refineChampionData(championData) {
        // 디버깅을 위해 패시브 이미지 정보 출력
        console.log('패시브 이미지 정보:', championData.passive.image);
        
        return {
            // 기본 정보
            id: championData.id,
            name: championData.name,
            title: championData.title,
            key: championData.key,
            
            // 이미지 정보
            image: {
                full: `${this.imageBaseURL}${championData.image.full}`,
                sprite: `${this.imageBaseURL}${championData.image.sprite}`,
                loading: `${this.loadingImageBaseURL}${championData.id}_0.jpg`
            },
            
            // 스킨 정보
            skins: championData.skins.map(skin => ({
                id: skin.id,
                name: skin.name,
                num: skin.num,
                chromas: skin.chromas
            })),
            
            // 스토리 정보
            lore: championData.lore,
            blurb: championData.blurb,
            
            // 팁 정보
            allytips: championData.allytips,
            enemytips: championData.enemytips,
            
            // 태그 및 타입
            tags: championData.tags,
            partype: championData.partype,
            
            // 난이도 정보
            difficulty: championData.info.difficulty,
            attack: championData.info.attack,
            defense: championData.info.defense,
            magic: championData.info.magic,
            
            // 스탯 정보
            stats: {
                hp: championData.stats.hp,
                hpperlevel: championData.stats.hpperlevel,
                mp: championData.stats.mp,
                mpperlevel: championData.stats.mpperlevel,
                movespeed: championData.stats.movespeed,
                armor: championData.stats.armor,
                armorperlevel: championData.stats.armorperlevel,
                spellblock: championData.stats.spellblock,
                spellblockperlevel: championData.stats.spellblockperlevel,
                attackrange: championData.stats.attackrange,
                hpregen: championData.stats.hpregen,
                hpregenperlevel: championData.stats.hpregenperlevel,
                mpregen: championData.stats.mpregen,
                mpregenperlevel: championData.stats.mpregenperlevel,
                crit: championData.stats.crit,
                critperlevel: championData.stats.critperlevel,
                attackdamage: championData.stats.attackdamage,
                attackdamageperlevel: championData.stats.attackdamageperlevel,
                attackspeedperlevel: championData.stats.attackspeedperlevel,
                attackspeed: championData.stats.attackspeed
            },
            
            // 스킬 정보
            spells: championData.spells.map(spell => ({
                id: spell.id,
                name: spell.name,
                description: spell.description,
                tooltip: spell.tooltip,
                maxrank: spell.maxrank,
                cooldown: spell.cooldown,
                cost: spell.cost,
                range: spell.range,
                image: `${this.spellImageBaseURL}${spell.image.full}`
            })),
            
            // 패시브 정보
            passive: {
                name: championData.passive.name,
                description: championData.passive.description,
                image: `${this.spellImageBaseURL}${championData.passive.image.full}`
            }
        };
    }

    /**
     * 챔피언 정보를 콘솔에 출력합니다
     * @param {Object} championInfo - 정제된 챔피언 정보
     */
    displayChampionInfo(championInfo) {
        console.log('=== 챔피언 정보 ===');
        console.log(`이름: ${championInfo.name}`);
        console.log(`제목: ${championInfo.title}`);
        console.log(`ID: ${championInfo.id}`);
        console.log(`키: ${championInfo.key}`);
        
        console.log('\n=== 스탯 정보 ===');
        console.log(`체력: ${championInfo.stats.hp} (+${championInfo.stats.hpperlevel}/레벨)`);
        console.log(`마나: ${championInfo.stats.mp} (+${championInfo.stats.mpperlevel}/레벨)`);
        console.log(`이동속도: ${championInfo.stats.movespeed}`);
        console.log(`공격력: ${championInfo.stats.attackdamage} (+${championInfo.stats.attackdamageperlevel}/레벨)`);
        console.log(`방어력: ${championInfo.stats.armor} (+${championInfo.stats.armorperlevel}/레벨)`);
        console.log(`마법저항력: ${championInfo.stats.spellblock} (+${championInfo.stats.spellblockperlevel}/레벨)`);
        
        console.log('\n=== 스킬 정보 ===');
        console.log(`패시브: ${championInfo.passive.name} - ${championInfo.passive.description}`);
        
        championInfo.spells.forEach((spell, index) => {
            console.log(`\n스킬 ${index + 1}: ${spell.name}`);
            console.log(`설명: ${spell.description}`);
            console.log(`최대 레벨: ${spell.maxrank}`);
            console.log(`재사용 대기시간: ${spell.cooldown.join('/')}초`);
            console.log(`소모: ${spell.cost.join('/')}`);
            console.log(`사거리: ${spell.range.join('/')}`);
        });
        
        console.log('\n=== 팁 정보 ===');
        console.log('아군 팁:');
        championInfo.allytips.forEach(tip => console.log(`- ${tip}`));
        console.log('\n적군 팁:');
        championInfo.enemytips.forEach(tip => console.log(`- ${tip}`));
        
        console.log('\n=== 스킨 정보 ===');
        championInfo.skins.forEach(skin => {
            console.log(`${skin.num}. ${skin.name}${skin.chromas ? ' (크로마 있음)' : ''}`);
        });
    }

    /**
     * 챔피언 정보를 HTML에 표시합니다
     * @param {Object} championInfo - 정제된 챔피언 정보
     * @param {string} containerId - 표시할 컨테이너 ID
     */
    displayChampionInfoInHTML(championInfo, containerId = 'champion-info') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('컨테이너를 찾을 수 없습니다:', containerId);
            return;
        }

        container.innerHTML = `
            <div class="champion-header">
                <img src="${championInfo.image.loading}" alt="${championInfo.name}" class="champion-loading-image">
                <div class="champion-basic-info">
                    <h1>${championInfo.name}</h1>
                    <p class="champion-title">${championInfo.title}</p>
                    <div class="champion-tags">
                        ${championInfo.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="champion-lore">
                        <h3>배경 이야기</h3>
                        <p>${championInfo.lore}</p>
                    </div>
                </div>
            </div>

            <div class="champion-stats">
                <h2>기본 스탯</h2>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-label">체력</span>
                        <span class="stat-value">${championInfo.stats.hp} (+${championInfo.stats.hpperlevel})</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">공격력</span>
                        <span class="stat-value">${championInfo.stats.attackdamage} (+${championInfo.stats.attackdamageperlevel})</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">방어력</span>
                        <span class="stat-value">${championInfo.stats.armor} (+${championInfo.stats.armorperlevel})</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">마법저항력</span>
                        <span class="stat-value">${championInfo.stats.spellblock} (+${championInfo.stats.spellblockperlevel})</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">이동속도</span>
                        <span class="stat-value">${championInfo.stats.movespeed}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">공격사거리</span>
                        <span class="stat-value">${championInfo.stats.attackrange}</span>
                    </div>
                </div>
            </div>

            <div class="champion-abilities">
                <h2>스킬</h2>
                <div class="passive">
                    <img src="${championInfo.passive.image}" alt="${championInfo.passive.name}" class="ability-icon">
                    <div class="ability-info">
                        <h3>${championInfo.passive.name}</h3>
                        <p>${championInfo.passive.description}</p>
                    </div>
                </div>
                
                ${championInfo.spells.map((spell, index) => `
                    <div class="ability">
                        <img src="${spell.image}" alt="${spell.name}" class="ability-icon">
                        <div class="ability-info">
                            <h3>${spell.name}</h3>
                            <p>${spell.description}</p>
                            <div class="ability-details">
                                <span>재사용 대기시간: ${spell.cooldown.join('/')}초</span>
                                <span>소모: ${spell.cost.join('/')}</span>
                                <span>사거리: ${spell.range.join('/')}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="champion-tips">
                <h2>게임 팁</h2>
                <div class="tips-section">
                    <h3>아군 팁</h3>
                    <ul>
                        ${championInfo.allytips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
                <div class="tips-section">
                    <h3>적군 팁</h3>
                    <ul>
                        ${championInfo.enemytips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
            </div>

            <div class="champion-skins">
                <h2>스킨</h2>
                <div class="skins-grid">
                    ${championInfo.skins.map(skin => `
                        <div class="skin-item">
                            <span class="skin-number">${skin.num}</span>
                            <span class="skin-name">${skin.name}</span>
                            ${skin.chromas ? '<span class="chroma-badge">크로마</span>' : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * 챔피언 카드에 클릭 이벤트를 추가합니다
     */
    addChampionCardClickEvents() {
        const championCards = document.querySelectorAll('.champion-card');
        championCards.forEach(card => {
            card.addEventListener('click', async (e) => {
                e.preventDefault();
                
                const championName = card.getAttribute('data-champion');
                if (!championName) return;
                
                try {
                    // 로딩 표시
                    const container = document.getElementById('champion-info');
                    container.innerHTML = '<div class="loading">챔피언 정보를 불러오는 중...</div>';
                    
                    // 챔피언 정보 불러오기
                    const championInfo = await this.getChampionInfo(championName);
                    
                    // HTML에 정보 표시
                    this.displayChampionInfoInHTML(championInfo, 'champion-info');
                    
                    // 페이지 상단으로 스크롤
                    container.scrollIntoView({ behavior: 'smooth' });
                    
                } catch (error) {
                    const container = document.getElementById('champion-info');
                    container.innerHTML = `<div class="error">챔피언을 찾을 수 없습니다: ${championName}</div>`;
                    console.error('챔피언 정보를 불러오는 중 오류:', error);
                }
            });
        });
    }
}

// 전역 객체로 내보내기
window.ChampionAPI = ChampionAPI; 