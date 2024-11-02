import Chart from "@/components/chart/Chart";
import { memo, useEffect, useState } from "react";
import { UserData, MostCompletedData } from "@/Data";
import { useCheckUserRequestQuery, useSignInRequestMutation } from "@/redux/api/authApi";

const Home = ({ title }) => {
  const [isSuccess] = useSignInRequestMutation({});
  const { data: checkUserData, isLoading } = useCheckUserRequestQuery();
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Created Questions",
        borderColor: "navy",
        pointRadius: 1,
        fill: true,
        backgroundColor: "rgba(0,0,0,0.1)",
        lineTension: 0.4,
        data: UserData.map((data) => data.userGain),
        borderWidth: 2,
        aspectRatio: 1,
      },
      {
        label: "Completed",
        borderColor: "navy",
        pointRadius: 1,
        fill: true,
        backgroundColor: "rgba(0,0,0,0.1)",
        lineTension: 0.4,
        data: MostCompletedData.map((data) => data?.completed),
        borderWidth: 2,
        aspectRatio: 1,
      },
    ],
  });

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(checkUserData));
  });

  return (
    <>
      <main className="min-h-full">
        <div className="bg-white shadow">
          <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold tracking-tight text-gray-900">{title}</h2>
          </div>
        </div>
        <div className="container">
          <div className="mt-5">
            <Chart chartData={userData} />
          </div>
        </div>
      </main>
    </>
  );
};

export default memo(Home);
