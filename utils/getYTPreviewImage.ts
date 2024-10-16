const YTPattern =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((?:\w|-){11})(?:\S+)?$/;

export default function getPreviewImgs(url: string) {
  const YTid = getYTid(url);
  if (YTid) {
    return {
      default: `https://img.youtube.com/vi/${YTid}/default.jpg`,
      sd: `https://img.youtube.com/vi/${YTid}/sddefault.jpg`,
      mq: `https://img.youtube.com/vi/${YTid}/mqdefault.jpg`,
    };
  }
}

function getYTid(url: string) {
  const _url = getURL(url);
  if (!(_url instanceof URL)) return;

  const matches = _url.href.match(YTPattern);
  return matches?.[1];
}

export const getURL = (url: string) => {
  if (typeof url !== "string") return;

  try {
    const _url = new URL(url);
    return _url;
  } catch (error) {
    console.log({ url, error });
    return;
  }
};
