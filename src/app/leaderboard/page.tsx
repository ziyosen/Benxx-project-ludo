'use client';
import Footer from '@/Components/Footer';
import WinnerNames from '@/Components/WinnerNames';
import { store } from '@/redux/store';
import { Provider } from "react-redux";

const Winner = () => {
  return (
    <Provider store={store}>
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="mt-auto md:text-6xl text-4xl font-bold font-serif mb-12 px-4 text-center">
          Final Leaderboard
        </h1>
        <WinnerNames />
        <Footer />
      </div>
    </Provider>
  );
};

export default Winner;