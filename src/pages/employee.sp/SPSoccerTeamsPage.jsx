import { useEffect, useState } from "react";
import { useSoccer } from "../../context/SoccerContext";
import { AnimatePresence, motion } from "framer-motion";
import {
  Spinner,
} from "@material-tailwind/react";
import AlertMessage from "../../components/AlertMessage";
import HeaderTittle from "../../components/HeaderTittle";
import DialogMessage from "../../components/DialogMessage";

function SPSoccerTeamsPage() {
  const {
    getSoccerTeams,
    createSoccerTeam,
    deleteSoccerTeam,
    errors: soccerErrors,
    teams: teamsBackup,
  } = useSoccer();
  const [loading, setLoading] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingRemoveF, setLoadingRemoveF] = useState(false);
  const [loadingRemoveL, setLoadingRemoveL] = useState(false);
  const [loadingRemoveI, setLoadingRemoveI] = useState(false);
  const [teams, setTeams] = useState(null);
  const [teamsToDelete, setTeamsToDelete] = useState([]);
  const [selectedRowF, setSelectedRowF] = useState(null);
  const [selectedRowL, setSelectedRowL] = useState(null);
  const [selectedRowI, setSelectedRowI] = useState(null);
  const [open, setOpen] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);
  const [progress, setProgress] = useState(0);
  const [titleDialog, setTitleDialog] = useState("");

  const handleOpen = () => setOpen((prev) => !prev);
  const handleOpenEnd = () => setOpenEnd((prev) => !prev);

  const onChangeInputValue = (teamId, fieldName, newValue) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team._id === teamId
          ? {
              ...team,
              [fieldName]:
                fieldName !== "teamname" ? Number(newValue) : newValue,
            }
          : team
      )
    );
  };

  const addTeam = (type) => {
    const newTeam = {
      _id: `${type}_${teams.filter((team) => team.type === type).length + 1}`,
      position: 0,
      teamname: "",
      plays: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsfavor: 0,
      goalsagainst: 0,
      goaldifference: 0,
      points: 0,
      type,
    };

    setTeams((prevTeams) => [...prevTeams, newTeam]);
  };

  const removeTeam = (selectedRow, type) => {
    if (selectedRow !== null) {
      const teamToDelete = teams.find((team) => team._id === selectedRow);
      const removedTeam = teams.filter((team) => team._id !== selectedRow);
      setTeams([...removedTeam]);
      if (!teamToDelete?._id.startsWith(type)) {
        setTeamsToDelete((prevTeamsToDelete) => [
          ...prevTeamsToDelete,
          teamToDelete,
        ]);
      }
      setSelectedRowF(null);
      setSelectedRowL(null);
      setSelectedRowI(null);
      if (type === "Femenil") setLoadingRemoveF(true);
      else if (type === "Libre") setLoadingRemoveL(true);
      else if (type === "Infantil") setLoadingRemoveI(true);
    }
  };
  useEffect(() => {
    if (loadingRemoveF) setLoadingRemoveF(false);
    if (loadingRemoveL) setLoadingRemoveL(false);
    if (loadingRemoveI) setLoadingRemoveI(false);
  }, [loadingRemoveF, loadingRemoveL, loadingRemoveI]);

  const handleButton = () => {
    if (teams.length < 1) {
      setTitleDialog("¡No hay ningún registro que editar!");
      handleOpenEnd();
      return;
    }
    handleOpen();
  };

  const handleClickDialog = (accept) => {
    setOpen(false);

    if (!accept) return;

    setLoadingUpdate(true);
  };

  const handleActionEnd = (opc) => {
    setOpenEnd(false);
  };

  useEffect(() => {
    if (loadingUpdate) {
      async function deleteTeam(data) {
        const res = await deleteSoccerTeam(data._id);
        if (res.status === 200) setProgress((prev) => prev + 1);
      }
      teamsToDelete.map((team) => {
        deleteTeam(team);
      });

      async function createOrUpdate(data) {
        const res = await createSoccerTeam(data);
        if (res.status === 200) setProgress((prev) => prev + 1);
      }
      teams.map((team) => {
        createOrUpdate(team);
      });

      setLoadingUpdate(false);
      setLoading(true);
      setTitleDialog("¡Información editada exitosamente!");
      handleOpenEnd();
    }
  }, [loadingUpdate]);

  useEffect(() => {
    if (loading) {
      async function request() {
        const res = await getSoccerTeams();
        setTeams(res);
        setLoading(false);
        setLoadingUpdate(false);
      }
      request();
    }
  }, [loading]);

  return (
    <div className="bg-white pt-6 pb-8 mt-5">
      {loadingUpdate && (
        <div className="fixed w-full h-screen top-0 flex justify-center items-center z-[9999]">
          <motion.div
            className="fixed bg-gray-600 bg-opacity-60 backdrop-blur-sm px-5 pt-3 rounded-md"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring" }}
          >
            <Spinner className="w-20 h-10" />
            <p className="text-center pt-1">
              {progress > 0
                ? `${(progress * 100) / (teams.length + teamsToDelete.length)}%`
                : "0%"}
            </p>
          </motion.div>
        </div>
      )}
      <HeaderTittle title={"Tablas de posiciones - Torneos de Fútbol"} />
      <div className="m-10">
        <div className="m-10 overflow-hidden">
          <AnimatePresence mode="sync">
            {soccerErrors.map((error, i) => (
              <motion.div
                key={i}
                initial={{ height: 0, y: -10, opacity: 0 }}
                animate={{ height: 48, y: 0, opacity: 1 }}
                exit={{ height: 0, y: -10, opacity: 0 }}
                transition={{ type: "spring", delay: i * 0.2 }}
              >
                <AlertMessage key={i} message={error} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <>
          <div className="max-h-[800px] min-h-[500px] overflow-y-auto overflow-x-hidden border-black border-[1px] border-t-8 border-t-[#6D1610] shadow-md">
            <table className="table-fixed w-full font-montserrat">
              <caption className="text-[#6D1610] text-4xl font-extrabold py-3 caption-top">
                Fútbol 9 - Femenil
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
              {loading || loadingRemoveF ? (
                <tbody>
                  <tr>
                    <td colSpan="10">Loading...</td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {teams
                      .filter((data) => data.type === "Femenil")
                      .map((team, i) => (
                        <motion.tr
                          key={i}
                          layout
                          className={`font-bold text-base lg:text-lg ${
                            selectedRowF === team._id
                              ? "bg-[#b2c1e2]"
                              : "bg-white"
                          }`}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{
                            type: "spring",
                            delay:
                              i >
                              teamsBackup.filter(
                                (data) => data.type === "Femenil"
                              ).length
                                ? 0
                                : i * 0.2,
                          }}
                          onClick={() => setSelectedRowF(team._id)}
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
          <div className="flex gap-10 my-5">
            <button
              className="bg-[#6D1610] w-12 h-12 min-w-12 min-h-12 rounded-full text-white font-extrabold text-6xl flex justify-center items-center"
              onClick={() => addTeam("Femenil")}
            >
              <p>+</p>
            </button>
            <button
              className="bg-[#6D1610] w-12 h-12 min-w-12 min-h-12 rounded-full text-white font-extrabold text-6xl flex justify-center items-end"
              onClick={() => removeTeam(selectedRowF, "Femenil")}
            >
              <p>-</p>
            </button>
          </div>
        </>
        <>
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
                          className={`font-bold text-base lg:text-lg ${
                            selectedRowL === team._id
                              ? "bg-[#b2c1e2] "
                              : "bg-white"
                          }`}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{
                            type: "spring",
                            delay:
                              i >
                              teamsBackup.filter(
                                (data) => data.type === "Libre"
                              ).length
                                ? 0
                                : i * 0.2,
                          }}
                          onClick={() => setSelectedRowL(team._id)}
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
          <div className="flex gap-10 my-5">
            <button
              className="bg-[#6D1610] w-12 h-12 min-w-12 min-h-12 rounded-full text-white font-extrabold text-6xl flex justify-center items-center"
              onClick={() => addTeam("Libre")}
            >
              <p>+</p>
            </button>
            <button
              className="bg-[#6D1610] w-12 h-12 min-w-12 min-h-12 rounded-full text-white font-extrabold text-6xl flex justify-center items-end"
              onClick={() => removeTeam(selectedRowL, "Libre")}
            >
              <p>-</p>
            </button>
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
                          className={`font-bold text-base lg:text-lg ${
                            selectedRowI === team._id
                              ? "bg-[#b2c1e2] "
                              : "bg-white"
                          }`}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{
                            type: "spring",
                            delay:
                              i >
                              teamsBackup.filter(
                                (data) => data.type === "Infantil"
                              ).length
                                ? 0
                                : i * 0.2,
                          }}
                          onClick={() => setSelectedRowI(team._id)}
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
          <div className="flex gap-10 my-5">
            <button
              className="bg-[#6D1610] w-12 h-12 min-w-12 min-h-12 rounded-full text-white font-extrabold text-6xl flex justify-center items-center"
              onClick={() => addTeam("Infantil")}
            >
              <p>+</p>
            </button>
            <button
              className="bg-[#6D1610] w-12 h-12 min-w-12 min-h-12 rounded-full text-white font-extrabold text-6xl flex justify-center items-end"
              onClick={() => removeTeam(selectedRowI, "Infantil")}
            >
              <p>-</p>
            </button>
          </div>
        </>
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="bg-white border-[#6D1610] border-2 p-1 rounded-full w-[300px]">
          <button
            onClick={() => handleButton()}
            className="bg-[#6D1610] text-white rounded-full font-montserrat text-3xl py-1 px-5 w-full"
            type="submit"
          >
            Editar
          </button>
        </div>
      </div>

      <DialogMessage
        handleOpen={handleOpen}
        open={open}
        setOpen={setOpen}
        handleAction={handleClickDialog}
        buttonCancel={true}
        title={"Confirmación"}
        message={"¿Deseas proceder con la edición?"}
      />

      <DialogMessage
        handleOpen={handleOpenEnd}
        open={openEnd}
        handleAction={handleActionEnd}
        buttonCancel={false}
        title="Aviso"
        message={titleDialog}
      />
    </div>
  );
}

export default SPSoccerTeamsPage;
