import { useEffect, useState } from "react";
import HeaderTittle from "../components/HeaderTittle";
import { useSoccer } from "../context/SoccerContext";
import { AnimatePresence, motion } from "framer-motion";

function SoccerTeamsPage() {
  const { getSoccerTeams, teams } = useSoccer();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      async function request() {
        const res = await getSoccerTeams();
        setLoading(false);
      }
      request();
    }
  }, [loading]);

  return (
    <div className="bg-white pt-6 pb-8 mt-5">
      <HeaderTittle title={"Tablas de posiciones - Torneos de Fútbol"} />
      <div className="m-10">
        {["Femenil", "Libre", "Infantil"].map((type, index) => (
          <div
            key={index}
            className="max-h-[800px] min-h-[500px] overflow-y-auto overflow-x-hidden border-black border-[1px] border-t-8 border-t-[#6D1610] shadow-md my-5"
          >
            <table className="table-fixed w-full font-montserrat">
              <caption className="text-[#6D1610] text-4xl font-extrabold py-3 caption-top">
                Fútbol 9 - {type}
              </caption>
              <thead className="bg-[#6D1610] sticky top-0 z-20 font-bold text-2xl text-white">
                <tr>
                  <th className="relative overflow-hidden border border-black">
                    <p className="p-3 break-words">Pos.</p>
                  </th>
                  <th className="relative overflow-hidden border border-black w-[500px]">
                    <p className="p-3 break-words">Nombre Del Equipo</p>
                  </th>
                  <th className="relative overflow-hidden border border-black">
                    <p className="p-3 break-words">J</p>
                  </th>
                  <th className="relative overflow-hidden border border-black">
                    <p className="p-3 break-words">G</p>
                  </th>
                  <th className="relative overflow-hidden border border-black">
                    <p className="p-3 break-words">E</p>
                  </th>
                  <th className="relative overflow-hidden border border-black">
                    <p className="p-3 break-words">P</p>
                  </th>
                  <th className="relative overflow-hidden border border-black">
                    <p className="p-3 break-words">GF</p>
                  </th>
                  <th className="relative overflow-hidden border border-black">
                    <p className="p-3 break-words">GC</p>
                  </th>
                  <th className="relative overflow-hidden border border-black">
                    <p className="p-3 break-words">DF</p>
                  </th>
                  <th className="relative overflow-hidden border border-black">
                    <p className="p-3 break-words">Puntos</p>
                  </th>
                </tr>
              </thead>
              {loading ? (
                <tbody>
                  <tr>
                    <td colSpan="10">Loading...</td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {teams
                      .filter((data) => data.type === type)
                      .map((team, i) => (
                        <motion.tr
                          key={i}
                          layout
                          className="font-bold text-base lg:text-lg bg-white"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{
                            type: "spring",
                            delay: i * 0.2,
                          }}
                        >
                          <th className="border-[1px] border-black h-12 px-3 text-center">
                            {team.position}
                          </th>
                          <th className="border-[1px] border-black h-12 px-3 text-center">
                            {team.teamname}
                          </th>
                          <th className="border-[1px] border-black h-12 px-3 text-center">
                            {team.plays}
                          </th>
                          <th className="border-[1px] border-black h-12 px-3 text-center">
                            {team.wins}
                          </th>
                          <th className="border-[1px] border-black h-12 px-3 text-center">
                            {team.draws}
                          </th>
                          <th className="border-[1px] border-black h-12 px-3 text-center">
                            {team.losses}
                          </th>
                          <th className="border-[1px] border-black h-12 px-3 text-center">
                            {team.goalsfavor}
                          </th>
                          <th className="border-[1px] border-black h-12 px-3 text-center">
                            {team.goalsagainst}
                          </th>
                          <th className="border-[1px] border-black h-12 px-3 text-center">
                            {team.goaldifference}
                          </th>
                          <th className="border-[1px] border-black h-12 px-3 text-center">
                            {team.points}
                          </th>
                        </motion.tr>
                      ))}
                  </AnimatePresence>
                </tbody>
              )}
            </table>
          </div>
        ))}
        {/* <>
          <div className="max-h-[800px] min-h-[500px] overflow-y-auto overflow-x-hidden border-black border-[1px] border-t-8 border-t-[#6D1610] shadow-md my-10">
            <table className="table-fixed w-full font-montserrat">
              <caption className="text-[#6D1610] text-4xl font-extrabold py-3 caption-top">
                Fútbol 9 - Libre
              </caption>
              <thead className="bg-[#6D1610] sticky top-0 z-20 font-bold text-2xl text-white">
                <tr>
                  <th className="relative overflow-hidden border border-black">
                    <p className="p-3 break-words">Pos.</p>
                  </th>
                  <th className="relative overflow-hidden border border-black w-[500px]">
                    <p className="p-3 break-words">Nombre Del Equipo</p>
                  </th>
                  <th className="relative overflow-hidden border border-black">
                    <p className="p-3 break-words">J</p>
                  </th>
                  <th className="relative overflow-hidden border border-black">
                    <p className="p-3 break-words">G</p>
                  </th>
                  <th className="relative overflow-hidden border border-black">
                    <p className="p-3 break-words">E</p>
                  </th>
                  <th className="relative overflow-hidden border border-black">
                    <p className="p-3 break-words">P</p>
                  </th>
                  <th className="relative overflow-hidden border border-black">
                    <p className="p-3 break-words">GF</p>
                  </th>
                  <th className="relative overflow-hidden border border-black">
                    <p className="p-3 break-words">GC</p>
                  </th>
                  <th className="relative overflow-hidden border border-black">
                    <p className="p-3 break-words">DF</p>
                  </th>
                  <th className="relative overflow-hidden border border-black">
                    <p className="p-3 break-words">Puntos</p>
                  </th>
                </tr>
              </thead>
              {loading || loadingRemoveL ? (
                <tbody>
                  <tr>
                    <td colSpan="10">Loading...</td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {teams
                      .filter((data) => data.type === "Libre")
                      .map((team, i) => (
                        <motion.tr
                          key={i}
                          layout
                          className={`font-bold text-base lg:text-lg bg-white`}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{
                            type: "spring",
                            delay: i * 0.2
                          }}
                        >
                          <th className="border-[1px] border-black">
                            <input
                              type="number"
                              defaultValue={team.position}
                              className="w-full h-12 px-3 text-center bg-transparent"
                              onChange={(e) =>
                                onChangeInputValue(
                                  team._id,
                                  "position",
                                  e.target.value
                                )
                              }
                            />
                          </th>
                          <th className="border-[1px] border-black">
                            <input
                              type="text"
                              defaultValue={team.teamname}
                              className="w-full text-center h-12 bg-transparent"
                              onChange={(e) =>
                                onChangeInputValue(
                                  team._id,
                                  "teamname",
                                  e.target.value
                                )
                              }
                            />
                          </th>
                          <th className="border-[1px] border-black">
                            <input
                              type="number"
                              defaultValue={team.plays}
                              className="w-full h-12 px-3 text-center bg-transparent "
                              onChange={(e) =>
                                onChangeInputValue(
                                  team._id,
                                  "plays",
                                  e.target.value
                                )
                              }
                            />
                          </th>
                          <th className="border-[1px] border-black">
                            <input
                              type="number"
                              defaultValue={team.wins}
                              className="w-full h-12 px-3 text-center bg-transparent"
                              onChange={(e) =>
                                onChangeInputValue(
                                  team._id,
                                  "wins",
                                  e.target.value
                                )
                              }
                            />
                          </th>
                          <th className="border-[1px] border-black">
                            <input
                              type="number"
                              defaultValue={team.draws}
                              className="w-full h-12 px-3 text-center bg-transparent"
                              onChange={(e) =>
                                onChangeInputValue(
                                  team._id,
                                  "draws",
                                  e.target.value
                                )
                              }
                            />
                          </th>
                          <th className="border-[1px] border-black">
                            <input
                              type="number"
                              defaultValue={team.losses}
                              className="w-full h-12 px-3 text-center bg-transparent"
                              onChange={(e) =>
                                onChangeInputValue(
                                  team._id,
                                  "losses",
                                  e.target.value
                                )
                              }
                            />
                          </th>
                          <th className="border-[1px] border-black">
                            <input
                              type="number"
                              defaultValue={team.goalsfavor}
                              className="w-full h-12 px-3 text-center bg-transparent"
                              onChange={(e) =>
                                onChangeInputValue(
                                  team._id,
                                  "goalsfavor",
                                  e.target.value
                                )
                              }
                            />
                          </th>
                          <th className="border-[1px] border-black">
                            <input
                              type="number"
                              defaultValue={team.goalsagainst}
                              className="w-full h-12 px-3 text-center bg-transparent"
                              onChange={(e) =>
                                onChangeInputValue(
                                  team._id,
                                  "goalsagainst",
                                  e.target.value
                                )
                              }
                            />
                          </th>
                          <th className="border-[1px] border-black">
                            <input
                              type="number"
                              defaultValue={team.goaldifference}
                              className="w-full h-12 px-3 text-center bg-transparent"
                              onChange={(e) =>
                                onChangeInputValue(
                                  team._id,
                                  "goaldifference",
                                  e.target.value
                                )
                              }
                            />
                          </th>
                          <th className="border-[1px] border-black">
                            <input
                              type="number"
                              defaultValue={team.points}
                              className="w-full h-12 px-3 text-center bg-transparent"
                              onChange={(e) =>
                                onChangeInputValue(
                                  team._id,
                                  "points",
                                  e.target.value
                                )
                              }
                            />
                          </th>
                        </motion.tr>
                      ))}
                  </AnimatePresence>
                </tbody>
              )}
            </table>
          </div>
        </>
        <>
          <div className="max-h-[800px] min-h-[500px] overflow-y-auto overflow-x-hidden border-black border-[1px] border-t-8 border-t-[#6D1610] shadow-md">
            <table className="table-fixed w-full font-montserrat">
              <caption className="text-[#6D1610] text-4xl font-extrabold py-3 caption-top">
                Fútbol 9 - Infantil
              </caption>
              <thead className="bg-[#6D1610] sticky top-0 z-20 font-bold text-2xl text-white">
                <tr>
                  <th className="relative overflow-hidden border border-black">
                    <p className="p-3 break-words">Pos.</p>
                  </th>
                  <th className="relative overflow-hidden border border-black w-[500px]">
                    <p className="p-3 break-words">Nombre Del Equipo</p>
                  </th>
                  <th className="relative overflow-hidden border border-black">
                    <p className="p-3 break-words">J</p>
                  </th>
                  <th className="relative overflow-hidden border border-black">
                    <p className="p-3 break-words">G</p>
                  </th>
                  <th className="relative overflow-hidden border border-black">
                    <p className="p-3 break-words">E</p>
                  </th>
                  <th className="relative overflow-hidden border border-black">
                    <p className="p-3 break-words">P</p>
                  </th>
                  <th className="relative overflow-hidden border border-black">
                    <p className="p-3 break-words">GF</p>
                  </th>
                  <th className="relative overflow-hidden border border-black">
                    <p className="p-3 break-words">GC</p>
                  </th>
                  <th className="relative overflow-hidden border border-black">
                    <p className="p-3 break-words">DF</p>
                  </th>
                  <th className="relative overflow-hidden border border-black">
                    <p className="p-3 break-words">Puntos</p>
                  </th>
                </tr>
              </thead>
              {loading || loadingRemoveI ? (
                <tbody>
                  <tr>
                    <td colSpan="10">Loading...</td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {teams
                      .filter((data) => data.type === "Infantil")
                      .map((team, i) => (
                        <motion.tr
                          key={i}
                          layout
                          className="font-bold text-base lg:text-lg bg-white"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{
                            type: "spring",
                            delay: i * 0.2,
                          }}
                        >
                          <th className="border-[1px] border-black">
                            <input
                              type="number"
                              defaultValue={team.position}
                              className="w-full h-12 px-3 text-center bg-transparent"
                              onChange={(e) =>
                                onChangeInputValue(
                                  team._id,
                                  "position",
                                  e.target.value
                                )
                              }
                            />
                          </th>
                          <th className="border-[1px] border-black">
                            <input
                              type="text"
                              defaultValue={team.teamname}
                              className="w-full text-center h-12 bg-transparent"
                              onChange={(e) =>
                                onChangeInputValue(
                                  team._id,
                                  "teamname",
                                  e.target.value
                                )
                              }
                            />
                          </th>
                          <th className="border-[1px] border-black">
                            <input
                              type="number"
                              defaultValue={team.plays}
                              className="w-full h-12 px-3 text-center bg-transparent"
                              onChange={(e) =>
                                onChangeInputValue(
                                  team._id,
                                  "plays",
                                  e.target.value
                                )
                              }
                            />
                          </th>
                          <th className="border-[1px] border-black">
                            <input
                              type="number"
                              defaultValue={team.wins}
                              className="w-full h-12 px-3 text-center bg-transparent"
                              onChange={(e) =>
                                onChangeInputValue(
                                  team._id,
                                  "wins",
                                  e.target.value
                                )
                              }
                            />
                          </th>
                          <th className="border-[1px] border-black">
                            <input
                              type="number"
                              defaultValue={team.draws}
                              className="w-full h-12 px-3 text-center bg-transparent"
                              onChange={(e) =>
                                onChangeInputValue(
                                  team._id,
                                  "draws",
                                  e.target.value
                                )
                              }
                            />
                          </th>
                          <th className="border-[1px] border-black">
                            <input
                              type="number"
                              defaultValue={team.losses}
                              className="w-full h-12 px-3 text-center bg-transparent"
                              onChange={(e) =>
                                onChangeInputValue(
                                  team._id,
                                  "losses",
                                  e.target.value
                                )
                              }
                            />
                          </th>
                          <th className="border-[1px] border-black">
                            <input
                              type="number"
                              defaultValue={team.goalsfavor}
                              className="w-full h-12 px-3 text-center bg-transparent"
                              onChange={(e) =>
                                onChangeInputValue(
                                  team._id,
                                  "goalsfavor",
                                  e.target.value
                                )
                              }
                            />
                          </th>
                          <th className="border-[1px] border-black">
                          {team.goalsagainst}
                          </th>
                          <th className="border-[1px] border-black">
                          {team.goaldifference}
                          </th>
                          <th className="border-[1px] border-black">
                          {team.points}
                          </th>
                        </motion.tr>
                      ))}
                  </AnimatePresence>
                </tbody>
              )}
            </table>
          </div>
        </> */}
      </div>
    </div>
  );
}

export default SoccerTeamsPage;
