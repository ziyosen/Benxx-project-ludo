
interface PlayerListProps {
  list: string[];
}

const PlayerList: React.FC<PlayerListProps> = ({ list }) => {
  return (
    <>
      {
        list && list.map((item) =>
          <div key={item}>
            <span className="m-2 p-2 h-5 text-xl font-mono">
              {item}
            </span>
          </div>
        )
      }
    </>
  );
};

export default PlayerList;
