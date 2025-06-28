/**
 * 리그 오브 레전드 챔피언 정보 API 클래스
 * Data Dragon API를 사용하여 챔피언 정보를 가져오고 정제합니다.
 */
class ChampionInfoService {
    constructor() {
        this.baseUrl = 'https://ddragon.leagueoflegends.com/cdn';
        this.version = '15.11.1'; // 최신 버전
        this.language = 'ko_KR'; // 한국어
    }

    /**
     * 챔피언 이름으로 상세 정보를 가져옵니다
     * @param {string} championName - 챔피언 영문명 (예: 'Olaf', 'Ahri')
     * @returns {Promise<Object>} 정제된 챔피언 정보
     */
    async getChampionInfo(championName) {
        try {
            const url = `${this.baseUrl}/${this.version}/data/${this.language}/champion/${championName}.json`;
            console.log(`API 요청 URL: ${url}`); // 디버깅용
            
            const response = await fetch(url);
            console.log(`API 응답 상태: ${response.status}`); // 디버깅용
            
            if (!response.ok) {
                // 상세한 에러 정보 제공
                const errorText = await response.text();
                console.error(`API 에러 응답:`, errorText);
                throw new Error(`HTTP error! status: ${response.status}, championName: ${championName}`);
            }
            
            const data = await response.json();
            console.log(`API 응답 데이터 키들:`, Object.keys(data.data)); // 디버깅용
            
            const championData = data.data[championName];
            if (!championData) {
                throw new Error(`챔피언 데이터를 찾을 수 없습니다: ${championName}`);
            }
            
            return this.formatChampionData(championData);
        } catch (error) {
            console.error(`챔피언 '${championName}' 정보를 가져오는데 실패했습니다:`, error);
            throw error;
        }
    }

    /**
     * 여러 챔피언의 정보를 한번에 가져옵니다
     * @param {string[]} championNames - 챔피언 영문명 배열
     * @returns {Promise<Object[]>} 정제된 챔피언 정보 배열
     */
    async getMultipleChampionsInfo(championNames) {
        try {
            const promises = championNames.map(name => this.getChampionInfo(name));
            const results = await Promise.allSettled(promises);
            
            return results.map((result, index) => {
                if (result.status === 'fulfilled') {
                    return result.value;
                } else {
                    console.error(`챔피언 '${championNames[index]}' 정보 가져오기 실패:`, result.reason);
                    return null;
                }
            }).filter(Boolean); // null 값 제거
        } catch (error) {
            console.error('여러 챔피언 정보를 가져오는데 실패했습니다:', error);
            throw error;
        }
    }

    /**
     * 원시 챔피언 데이터를 사용하기 쉬운 형태로 정제합니다
     * @param {Object} rawData - API에서 받은 원시 데이터
     * @returns {Object} 정제된 챔피언 정보
     */
    formatChampionData(rawData) {
        return {
            // 기본 정보
            basic: {
                id: rawData.id,
                key: rawData.key,
                name: rawData.name,
                title: rawData.title,
                tags: rawData.tags,
                difficulty: rawData.info?.difficulty || 0
            },

            // 이미지 정보
            images: {
                icon: `${this.baseUrl}/${this.version}/img/champion/${rawData.image.full}`,
                splash: `${this.baseUrl}/img/champion/splash/${rawData.id}_0.jpg`,
                loading: `${this.baseUrl}/img/champion/loading/${rawData.id}_0.jpg`
            },

            // 스킨 정보
            skins: rawData.skins?.map(skin => ({
                id: skin.id,
                name: skin.name,
                image: `${this.baseUrl}/img/champion/splash/${rawData.id}_${skin.num}.jpg`,
                hasChroma: skin.chromas || false
            })) || [],

            // 스토리
            lore: {
                full: rawData.lore || '',
                summary: rawData.blurb || ''
            },

            // 스탯 정보
            stats: {
                hp: {
                    base: rawData.stats?.hp || 0,
                    perLevel: rawData.stats?.hpperlevel || 0
                },
                mp: {
                    base: rawData.stats?.mp || 0,
                    perLevel: rawData.stats?.mpperlevel || 0,
                    type: rawData.partype || '마나'
                },
                attack: {
                    damage: rawData.stats?.attackdamage || 0,
                    damagePerLevel: rawData.stats?.attackdamageperlevel || 0,
                    speed: rawData.stats?.attackspeed || 0,
                    speedPerLevel: rawData.stats?.attackspeedperlevel || 0,
                    range: rawData.stats?.attackrange || 0
                },
                defense: {
                    armor: rawData.stats?.armor || 0,
                    armorPerLevel: rawData.stats?.armorperlevel || 0,
                    magicResist: rawData.stats?.spellblock || 0,
                    magicResistPerLevel: rawData.stats?.spellblockperlevel || 0
                },
                movement: {
                    speed: rawData.stats?.movespeed || 0
                },
                ratings: {
                    attack: rawData.info?.attack || 0,
                    defense: rawData.info?.defense || 0,
                    magic: rawData.info?.magic || 0,
                    difficulty: rawData.info?.difficulty || 0
                }
            },

            // 스킬 정보
            abilities: {
                passive: {
                    name: rawData.passive?.name || '',
                    description: rawData.passive?.description || '',
                    image: rawData.passive?.image ? 
                        `${this.baseUrl}/${this.version}/img/passive/${rawData.passive.image.full}` : ''
                },
                spells: rawData.spells?.map((spell, index) => ({
                    id: spell.id,
                    name: spell.name,
                    description: spell.description,
                    tooltip: spell.tooltip,
                    maxRank: spell.maxrank,
                    cooldown: spell.cooldown,
                    cost: spell.cost,
                    range: spell.range,
                    image: `${this.baseUrl}/${this.version}/img/spell/${spell.image.full}`,
                    key: ['Q', 'W', 'E', 'R'][index]
                })) || []
            },

            // 팁
            tips: {
                ally: rawData.allytips || [],
                enemy: rawData.enemytips || []
            }
        };
    }

    /**
     * 챔피언 이름을 검색합니다 (한글/영문 지원)
     * @param {string} searchTerm - 검색어
     * @returns {Promise<string[]>} 매칭되는 챔피언 영문명 배열
     */
    async searchChampionNames(searchTerm) {
        try {
            const url = `${this.baseUrl}/${this.version}/data/${this.language}/champion.json`;
            const response = await fetch(url);
            const data = await response.json();
            
            const champions = Object.values(data.data);
            const term = searchTerm.toLowerCase();
            
            return champions
                .filter(champion => 
                    champion.name.toLowerCase().includes(term) ||
                    champion.id.toLowerCase().includes(term) ||
                    champion.title.toLowerCase().includes(term)
                )
                .map(champion => champion.id);
        } catch (error) {
            console.error('챔피언 검색 중 오류 발생:', error);
            return [];
        }
    }

    /**
     * 모든 챔피언 목록을 가져옵니다
     * @returns {Promise<Object[]>} 간단한 챔피언 정보 목록
     */
    async getAllChampions() {
        try {
            const url = `${this.baseUrl}/${this.version}/data/${this.language}/champion.json`;
            const response = await fetch(url);
            const data = await response.json();
            
            return Object.values(data.data).map(champion => ({
                id: champion.id,
                name: champion.name,
                title: champion.title,
                tags: champion.tags,
                image: `${this.baseUrl}/${this.version}/img/champion/${champion.image.full}`
            }));
        } catch (error) {
            console.error('전체 챔피언 목록을 가져오는데 실패했습니다:', error);
            throw error;
        }
    }

    /**
     * 정확한 챔피언 ID 매핑을 확인합니다
     * @returns {Promise<Object>} 챔피언 이름과 ID 매핑
     */
    async getChampionIdMapping() {
        try {
            const url = `${this.baseUrl}/${this.version}/data/${this.language}/champion.json`;
            const response = await fetch(url);
            const data = await response.json();
            
            const mapping = {};
            Object.values(data.data).forEach(champion => {
                mapping[champion.name] = champion.id;
                mapping[champion.id] = champion.id; // ID로도 접근 가능하게
            });
            
            console.log('전체 챔피언 ID 매핑:', mapping);
            return mapping;
        } catch (error) {
            console.error('챔피언 ID 매핑을 가져오는데 실패했습니다:', error);
            throw error;
        }
    }
}

// 사용 예시
const championService = new ChampionInfoService();

// 단일 챔피언 정보 가져오기
async function getOlafInfo() {
    try {
        const olafInfo = await championService.getChampionInfo('Olaf');
        console.log('올라프 정보:', olafInfo);
        return olafInfo;
    } catch (error) {
        console.error('올라프 정보 가져오기 실패:', error);
    }
}

// 여러 챔피언 정보 가져오기
async function getMultipleChampions() {
    try {
        const champions = await championService.getMultipleChampionsInfo([
            'Ahri', 'Yasuo', 'Jinx', 'Garen', 'Lux'
        ]);
        console.log('여러 챔피언 정보:', champions);
        return champions;
    } catch (error) {
        console.error('여러 챔피언 정보 가져오기 실패:', error);
    }
}

// 챔피언 검색
async function searchChampion(searchTerm) {
    try {
        const results = await championService.searchChampionNames(searchTerm);
        console.log(`"${searchTerm}" 검색 결과:`, results);
        return results;
    } catch (error) {
        console.error('챔피언 검색 실패:', error);
    }
}

// 전체 챔피언 목록
async function getAllChampionsList() {
    try {
        const allChampions = await championService.getAllChampions();
        console.log('전체 챔피언 목록:', allChampions);
        return allChampions;
    } catch (error) {
        console.error('전체 챔피언 목록 가져오기 실패:', error);
    }
}

// 내보내기
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ChampionInfoService,
        getOlafInfo,
        getMultipleChampions,
        searchChampion,
        getAllChampionsList
    };
} 