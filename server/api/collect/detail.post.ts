export default defineWrappedResponseHandler(async (event) => {
  const { key } = await readBody(event)
  const data = await useStorage('assets:server').getItem(`collect/${key}/data.json`) as unknown as CollectDetail

  return data
})
