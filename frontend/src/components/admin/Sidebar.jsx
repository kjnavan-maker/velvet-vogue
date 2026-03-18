import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ADMIN_LINKS } from "../../utils/constants";
import { logoutUser } from "../../features/auth/authSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <aside className="border-r border-slate-200 bg-white p-6">
      <Link to="/admin/dashboard" className="font-display text-2xl font-bold text-slate-900">
        Velvet <span className="text-velvet-gold">Vogue</span>
      </Link>

      <div className="mt-10 space-y-3">
        {ADMIN_LINKS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-velvet-black text-white"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="mt-10 w-full rounded-2xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
      >
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;