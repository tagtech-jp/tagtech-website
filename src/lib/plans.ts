export type Plan = {
  name: string
  price: string
  features: string[]
  support: string
}

export const PLANS: Plan[] = [
  {
    name: 'Free',
    price: 'オープンベータ・無料公開中',
    features: [
      '全プラットフォーム対応',
      'リスナー登録 10 名まで',
      'イベント勝率・AI カンペ・自動切り抜き・横断ポイントは制限あり',
    ],
    support: 'コミュニティ',
  },
  {
    name: 'Standard',
    price: 'オープンベータ・無料公開中',
    features: [
      '全プラットフォーム対応',
      'リスナー登録 100 名まで',
      '月 3 イベント勝率計算',
      'AI カンペ 月 20 回',
      '自動切り抜き 月 3 本',
      '横断ポイント',
    ],
    support: 'メール',
  },
  {
    name: 'Premium',
    price: 'オープンベータ・無料公開中',
    features: [
      '全プラットフォーム対応',
      'リスナー登録無制限',
      'イベント勝率無制限',
      'AI カンペ 月 500 回',
      '自動切り抜き 月 30 本',
      '横断ポイント',
    ],
    support: 'チャット優先',
  },
  {
    name: 'Enterprise',
    price: 'オープンベータ・無料公開中',
    features: [
      '全プラットフォーム対応',
      '複数アカウント管理',
      'API 提供',
      'カスタマイズ対応',
    ],
    support: 'チャット優先',
  },
]
