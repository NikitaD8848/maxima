import useLinguisticsAndForexHook from "../../../hooks/GeneralHooks/NavbarHooks/LinguisticsAndForexHook";
import useMultilangHook from "../../../hooks/LanguageHook/Multilanguages-hook";

const LinguisticsAndForex = () => {
  const { handleCurrencyValueChange } = useLinguisticsAndForexHook();
  const { handleLanguageChange, multiLanguagesData }: any = useMultilangHook();

  return (
    <>
      <div className="mx-3">
        <select
          onChange={(e) => handleLanguageChange(e?.target?.value)}
          className="select-field cursor_pointer"
        >
          {multiLanguagesData?.length > 0 &&
            multiLanguagesData !== null &&
            multiLanguagesData.map((lang: any) => {
              return <option value={lang?.lang_code}>{lang?.lang_name}</option>;
            })}
        </select>
      </div>
      <div className="mx-3">
        <select
          className="select-field cursor_pointer"
          // value={selectedLanguage}
          onChange={(e) => handleCurrencyValueChange(e.target.value)}
        >
          <option value="INR">₹</option>
          <option value="USD">$</option>
          <option value="EUR">€</option>
        </select>
      </div>
    </>
  );
};

export default LinguisticsAndForex;
