import { useNavigate } from "react-router-dom";
import iconeLogout from "./img/iconLogout.png";
import * as S from "./btnLogout";

export function BtnLogout() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <S.Container>
      <S.Button onClick={handleLogout}>
        <S.Text>Logout</S.Text>
        <span>
          <img src={iconeLogout} alt="Icon" />
        </span>
      </S.Button>
    </S.Container>
  );
}
