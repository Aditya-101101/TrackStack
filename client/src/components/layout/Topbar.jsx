import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div>
        <p className="text-sm text-gray-500">Welcome</p>
        <h2 className="font-semibold">{user?.name || "User"}</h2>
      </div>

      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium"
      >
        Logout
      </button>
    </header>
  );
}

export default Topbar;