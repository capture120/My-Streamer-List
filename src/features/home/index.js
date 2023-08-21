import HiddenComponent from "../users/hidden-component";

import { useSelector } from "react-redux";

function Home() {
  const { currentUser } = useSelector((state) => { return state.user });
  return (
    <div>
      <h1>Home</h1>
      {JSON.stringify(currentUser)}
      <HiddenComponent>
        <div>
          Display if logged in!
        </div>
      </HiddenComponent>
    </div>
  );
}

export default Home;