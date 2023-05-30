/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react";
import { createContext, useContext } from "react";
import { getNFTINOAll } from "services/nfts";

export const ProjectContext = createContext();
export const useContexts = () => useContext(ProjectContext);
export const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [active, setDataActive] = useState([]);
  const [upcoming, setDataUpcoming] = useState([]);
  const [completed, setDataCompleted] = useState([]);
  const [activeID, setActiveID] = useState(1);
  const countActive = active.length;
  const countCompleted = completed.length;
  const countComing = upcoming.length;
  const categories = [
    {
      id: 1,
      text: `All (${countActive + countComing + countCompleted})`,
    },
    {
      id: 2,
      text: `Active (${countActive})`,
    },

    {
      id: 3,
      text: `Upcoming (${countComing})`,
    },
    {
      id: 4,
      text: `Completed (${countCompleted})`,
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const allData = await getNFTINOAll();
      const all = allData?.data || [];
      const actives = all.filter(
        (x) => x.attributes.collectionStatus === "Active"
      );
      const upcoming = all
        .filter((x) => x.attributes.collectionStatus === "Upcoming")
        .sort(
          (a, b) =>
            new Date(a.attributes.publicStartTime) -
            new Date(b.attributes.publicStartTime)
        );
      const completed = all
        .filter((x) => x.attributes.collectionStatus === "Completed")
        .sort(
          (a, b) =>
            new Date(b.attributes.publicEndTime) -
            new Date(a.attributes.publicEndTime)
        );
      setDataActive(actives);
      setDataUpcoming(upcoming);
      setDataCompleted(completed);
      setData(all);
    } catch (ex) {
      console.log(ex);
    }
  };

  const getDataActive = () => {
    let results = [];
    switch (activeID) {
      case 1:
        results = data;
        break;
      case 2:
        results = active;
        break;
      case 3:
        results = upcoming;
        break;
      case 4:
        results = completed;
        break;
      default:
        results = data;
    }
    return results;
  };

  const value = useMemo(
    () => ({
      active,
      upcoming,
      completed,
      getData,
      setActiveID,
      categories,
      activeID,
      data,
      getDataActive,
    }),
    [
      active,
      upcoming,
      completed,
      getData,
      setActiveID,
      categories,
      activeID,
      data,
      getDataActive,
    ]
  );

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
