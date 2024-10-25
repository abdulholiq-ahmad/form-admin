import { Link } from "react-router-dom";
import ButtonLang from "../button/ButtonLang";
import Time from "react-time-format";
import { Tooltip } from "antd";

export default function TableComponent({ data }) {
  return (
    <div>
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-center font-semibold text-gra:pl-0 text-base">
              Form title
            </th>
            <th scope="col" className="px-3 py-3.5 text-center font-semibold text-gray-900 text-base">
              Created at
            </th>
            <th scope="col" className="px-3 py-3.5 text-center font-semibold text-gray-900 text-base">
              Response
            </th>
            <th scope="col" className="px-3 py-3.5 text-center font-semibold text-gray-900 text-base">
              Languages
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data?.form?.map((item) => (
            <tr key={item._id} className="hover:cursor-pointer">
              <td className="whitespace-nowrap text-center py-4 pl-4 pr-3 text-sm font-medium text-gray-700 sm:pl-0">{item.title}</td>
              <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{<Time value={item.createdAt} format="DD.MM.YYYY" />}</td>
              <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">{item.responseCount}</td>
              <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                {["uz", "ru", "en"].map((lang) => (
                  <Tooltip
                    key={lang}
                    placement="top"
                    title={`${lang.charAt(0).toUpperCase() + lang.slice(1)} dagi ma'lumotlar`}
                    color={"#fff"}
                    overlayInnerStyle={{ color: "#000" }}
                  >
                    <Link className="mx-1" to={`/update-question/${item._id}/lang/${lang ? lang : "ru"}`}>
                      <ButtonLang lang={lang} active={lang === "ru" || item.translates?.map((l) => l.language).includes(lang)} />
                    </Link>
                  </Tooltip>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
