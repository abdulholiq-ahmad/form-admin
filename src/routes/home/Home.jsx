import Chart from "@/components/chart/Chart";
import { memo, useEffect, useState } from "react";
import { UserData } from "@/Data";
import { useCheckUserRequestQuery, useSignInRequestMutation } from "@/redux/api/authApi";

const Home = ({ title }) => {
  const [isSuccess] = useSignInRequestMutation({});
  const { data: checkUserData, isLoading } = useCheckUserRequestQuery();
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Created Questions",
        data: UserData.map((data) => data.userGain),
        backgroundColor: ["#FADA5E"],
        fill: false,
        borderColor: ["#FADA5E"],
        borderWidth: 1.5,
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
