import RealToolPage from "@/components/tools/RealToolPage";

type Locale="zh"|"zh-TW"|"en";
function getLocale(raw?:string):Locale{if(raw==="en")return"en";if(raw==="zh-TW"||raw==="zh-tw")return"zh-TW";return"zh";}
export default function Page({params}:{params:{locale:string}}){return <RealToolPage slug="url-codec" locale={getLocale(params?.locale)}/>;}
