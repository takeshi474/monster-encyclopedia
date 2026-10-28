
import { useEffect, useState } from 'react'
import './App.css'
import partNames from './data/PartNames.json'

const monsterIcons = {
  'アジャラカン': 'Ajarakan_Icon.png',
  'アルシュベルド': 'Arkveld_Icon.png',
  '護竜アルシュベルド': 'Guardian_Arkveld_Icon.png',
  'イャンクック': 'Yian_Kut-Ku_Icon.png',
  'ウズ・トゥナ': 'Uth_Duna_Icon.png',
  'オメガ・プラネテス': 'Omega_Planetes_Icon.png',
  'グラビモス': 'Gravios_Icon.png',
  'ケマトリス': 'Quematrice_Icon.png',
  'ゲリョス': 'Gypceros_Icon.png',
  'ゴア・マガラ': 'Gore_Magala_Icon.png',
  'ゴグマジオス': 'Gogmazios_Icon.png',
  '護竜アンジャナフ亜種': 'Guardian_Fulgur_Anjanath_Icon.png',
  '護竜オドガロン亜種': 'Guardian_Ebony_Odogaron_Icon.png',
  '護竜ドシャグマ': 'Guardian_Doshaguma_Icon.png',
  '護竜リオレウス': 'Guardian_Rathalos_Icon.png',
  'シーウー': 'Xu_Wu_Icon.png',
  'ジン・ダハド': 'Jin_Dahaad_Icon.png',
  'セルレギオス': 'Seregios_Icon.png',
  'ゾ・シア': 'Zoh_Shia_Icon.png',
  'タマミツネ': 'Mizutsune_Icon.png',
  'チャタカブラ': 'Chatacabra_Icon.png',
  'ドシャグマ': 'Doshaguma_Icon.png',
  'ドドブランゴ': 'Blangonga_Icon.png',
  'ヌ・エグドラ': 'Nu_Udra_Icon.png',
  'ネルスキュラ': 'Nerscylla_Icon.png',
  'バーラハーラ': 'Balahara_Icon.png',
  'ババコンガ': 'Congalala_Icon.png',
  'ヒラバミ': 'Hirabami_Icon.png',
  'ププロポル': 'Rompopolo_Icon.png',
  'ラギアクルス': 'Lagiacrus_Icon.png',
  'ラバラ・バリナ': 'Lala_Barina_Icon.png',
  'リオレイア': 'Rathian_Icon.png',
  'リオレウス': 'Rathalos_Icon.png',
  'レ・ダウ': 'Rey_Dau_Icon.png',
}

const monsterTitles = {
  'アジャラカン': '赫猿獣',
  'アルシュベルド': '鎖刃竜',
  '護竜アルシュベルド': '護鎖刃竜',
  'イャンクック': '怪鳥',
  'ウズ・トゥナ': '波衣竜',
  'オメガ・プラネテス': 'オメガ・プラネテス',
  'グラビモス': '鎧竜',
  'ケマトリス': '炎尾竜',
  'ゲリョス': '毒怪鳥',
  'ゴア・マガラ': '黒蝕竜',
  'ゴグマジオス': '巨戟龍',
  '護竜アンジャナフ亜種': '護雷顎竜',
  '護竜オドガロン亜種': '護兇爪竜',
  '護竜ドシャグマ': '護闢獣',
  '護竜リオレウス': '護火竜',
  'シーウー': '暗器蛸',
  'ジン・ダハド': '凍峰竜',
  'セルレギオス': '千刃竜',
  'ゾ・シア': '白熾龍',
  'タマミツネ': '泡狐竜',
  'チャタカブラ': '纏蛙',
  'ドシャグマ': '闢獣',
  'ドドブランゴ': '雪獅子',
  'ヌ・エグドラ': '獄焔蛸',
  'ネルスキュラ': '影蜘蛛',
  'バーラハーラ': '沙海竜',
  'ババコンガ': '桃毛獣',
  'ヒラバミ': '風鋏竜',
  'ププロポル': '沼噴竜',
  'ラギアクルス': '海竜',
  'ラバラ・バリナ': '刺花蜘蛛',
  'リオレイア': '雌火竜',
  'リオレウス': '火竜',
  'レ・ダウ': '煌雷竜',
}

const partLabels = Object.fromEntries(
  partNames.map(({ part, names }) => [
    part,
    names?.ja || part,
  ])
)

const weaknessCategories = [
  {
    title: '属性',
    items: [
      { kind: 'element', key: 'fire', label: '火属性', icon: '🔥' },
      { kind: 'element', key: 'water', label: '水属性', icon: '💧' },
      { kind: 'element', key: 'thunder', label: '雷属性', icon: '⚡' },
      { kind: 'element', key: 'ice', label: '氷属性', icon: '❄️' },
      { kind: 'element', key: 'dragon', label: '龍属性', icon: '🐉' },
    ],
  },
  
  {
    title: '状態異常',
    items: [
      { kind: 'status', key: 'poison', label: '毒', icon: '☠️' },
      { kind: 'status', key: 'paralysis', label: '麻痺', icon: '⚡' },
      { kind: 'status', key: 'sleep', label: '睡眠', icon: '💤' },
      { kind: 'status', key: 'blastblight', label: '爆破', icon: '💥' },
      { kind: 'status', key: 'stun', label: '気絶', icon: '💫' },
    ],
  },
  {
    title: 'その他の効果',
    items: [
      { kind: 'effect', key: 'noise', label: '音', icon: '🔊' },
      { kind: 'effect', key: 'flash', label: '閃光', icon: '✨' },
      { kind: 'effect', key: 'stun', label: '気絶（効果）', icon: '💫' },
      { kind: 'effect', key: 'exhaust', label: '減気', icon: '💨' },
    ],
  },
]


function App() {
  const [monsters, setMonsters] = useState([])
  const [selectedMonster, setSelectedMonster] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [detailLoading, setDetailLoading] = useState(false)

  // モンスター一覧を取得する
  useEffect(() => {
    async function fetchMonsters() {
      try {
        const response = await fetch(
          'https://wilds.mhdb.io/ja/monsters?limit=100'
        )

        if (!response.ok) {
          throw new Error('データの取得に失敗しました')
        }

        const data = await response.json()

        setMonsters(
          data.filter((monster) => monster.kind === 'large')
        )
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMonsters()
  }, [])

  // モンスターの詳細を取得する
  async function handleMonsterClick(monster) {
    setSelectedMonster(null)
    setDetailLoading(true)

    try {
      const response = await fetch(
        `https://wilds.mhdb.io/ja/monsters/${monster.id}`
      )

      if (!response.ok) {
        throw new Error('詳細データの取得に失敗しました')
      }

      const data = await response.json()
      console.log('肉質データ:', data.parts)
      setSelectedMonster(data)
    } catch (error) {
      console.error(error)
      alert('モンスターの詳細データを取得できませんでした')
    } finally {
      setDetailLoading(false)
    }
  }

  if (loading) return <main><h1>読み込み中...</h1></main>
  if (error) return <main><p>エラー：{error}</p></main>

  return (
    <main>
      <h1>モンハンワイルズ図鑑</h1>
      <p>モンスターをクリックして詳細を確認！</p>

{detailLoading && <p>詳細データを読み込み中...</p>}
      
  <div className="monster-list">
    {monsters.map((monster) => (
      <section key={monster.id} className="monster-card">
        {monsterIcons[monster.name] && (
          <img
            src={`/images/monsters/${monsterIcons[monster.name]}`}
            alt={monster.name}
            className="monster-image"
          />
        )}

        <h2>{monster.name}</h2>
        <p>{monsterTitles[monster.name] ?? '別名未登録'}</p>
        <button onClick={() => handleMonsterClick(monster)}>
          詳細を見る
        </button>
      </section>
    ))}
  </div>

  {selectedMonster && (
    <div
      className="modal-overlay"
      onClick={() => setSelectedMonster(null)}
    >
      <section
        className="monster-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={() => setSelectedMonster(null)}
          aria-label="閉じる"
        >
          ✕
        </button>

        {monsterIcons[selectedMonster.name] && (
          <img
            src={`/images/monsters/${monsterIcons[selectedMonster.name]}`}
            alt={selectedMonster.name}
            className="monster-image"
          />
        )}

        <h2 id="modal-title">{selectedMonster.name}</h2>
        <p>
          {monsterTitles[selectedMonster.name] ?? '別名未登録'}
        </p>

        <p>
          {selectedMonster.description || '説明はありません。'}
        </p>

        <h3>弱点・有効な効果</h3>

        {weaknessCategories.map((category) => (
          <section key={category.title} className="weakness-section">
            <h4>{category.title}</h4>

            <div className="weakness-list">
              {category.items.map((item) => {
                const matches = (selectedMonster.weaknesses ?? []).filter(
                  (weakness) =>
                    weakness.kind === item.kind &&
                    weakness[item.kind] === item.key
                )

                const levels = matches.map((weakness) => weakness.level)

                return (
                  <div
                    className="weakness-item"
                    key={`${item.kind}-${item.key}`}
                  >
                    <span className="weakness-icon">{item.icon}</span>

                    <span className="weakness-name">{item.label}</span>

                    <span className="weakness-level">
                      {levels.length > 0
                        ? levels.map((level) => `★ ${level}`).join(' / ')
                        : '—'}
                    </span>
                  </div>
                )
              })}
            </div>
          </section>
        ))}
        <h3>肉質</h3>

        {selectedMonster.parts?.length > 0 ? (
          <div className="parts-table-wrapper">
            <table className="parts-table">
              <thead>
                <tr>
                  <th>部位</th>
                  <th>斬</th>
                  <th>打</th>
                  <th>弾</th>
                  <th>火</th>
                  <th>水</th>
                  <th>雷</th>
                  <th>氷</th>
                  <th>龍</th>
                </tr>
              </thead>

              <tbody>
                {selectedMonster.parts.map((part, index) => {
                  const values = part.multipliers ?? {}

                  return (
                    <tr key={`${part.part}-${index}`}>
                      <td>{partLabels[part.part] ?? part.part}</td>
                      <td>{values.slash != null ? Math.round(values.slash * 100) : '—'}</td>
                      <td>{values.blunt != null ? Math.round(values.blunt * 100) : '—'}</td>
                      <td>{values.pierce != null ? Math.round(values.pierce * 100) : '—'}</td>
                      <td>{values.fire != null ? Math.round(values.fire * 100) : '—'}</td>
                      <td>{values.water != null ? Math.round(values.water * 100) : '—'}</td>
                      <td>{values.thunder != null ? Math.round(values.thunder * 100) : '—'}</td>
                      <td>{values.ice != null ? Math.round(values.ice * 100) : '—'}</td>
                      <td>{values.dragon != null ? Math.round(values.dragon * 100) : '—'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p>肉質データはありません。</p>
        )}
      </section>
    </div>
  )}


    </main>
  )
}

export default App
