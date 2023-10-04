import { CMS_AA_URL } from '$env/static/private'

export async function GET ({ params, url }) {
  const q = url.searchParams.get('q') || ''
  const tag = url.searchParams.get('tag') || ''
  const limit = 25
  const fields =
    'fields=title,summary,publishedAt,slug,redirect,time_completion'
  const populate = 'populate=cover,tags'
  const filter = tag ? `filters[$and][0][Type][$eq]=${tag}` : ''
  const sort = 'sort=star:desc'

  const query = `${CMS_AA_URL}/common-commands?${sort}&pagination[pageSize]=${limit}&_q=${q}&${filter}`

  try {
    const response = await fetch(query, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    return new Response(JSON.stringify({ commands: data }))
  } catch (error) {
    return new Response({ message: error }, { status: 500 })
  }
}
