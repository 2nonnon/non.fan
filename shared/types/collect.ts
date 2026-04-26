export interface CollectItem {
  id: string
  title: string
  date: string
  content: string
}

export interface CollectListItem {
  id: string
  title: string
  year: string
  month: string
  day: string
}

export interface CollectDetail {
  url: string
  title: string
  date: string
  content: string
  html: string
}

export interface CollectCountItem {
  year: string
  total: number
}

export interface CollectTodayItem {
  id: string
  title: string
  date: string
  content: string
  ISODate: string
}
