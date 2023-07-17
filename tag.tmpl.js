export const layout = "layouts/tag.njk";


function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
    return result;
}

export default function* ({ search }) {
  for (const tag of search.tags()) {
    const randomString = generateRandomString(6);
    const timestamp = Date.now()
    yield {
      url: `/tags/${tag}-${timestamp}-${randomString}/`,
      title: `Tagged “${tag}”`,
      type: "tag",
      tag,
    };
  }
}
