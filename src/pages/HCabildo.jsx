import { useExtaData } from "../context/ExtraDataContext";
import CabildoMobile from "../components/home/Others/CabildoMobile";
import CabildoPC from "../components/home/Others/CabildoPC";
import HeaderTittle from "../components/HeaderTittle";

function HCabildo() {
  const { isMobile } = useExtaData();

  return (
    <div className="bg-white pt-6 pb-8 mt-5">
      <HeaderTittle title={"H. Cabildo"} />
      {isMobile ? <CabildoMobile /> : <CabildoPC />}
    </div>
  );
}

export default HCabildo;
