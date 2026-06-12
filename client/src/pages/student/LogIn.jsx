import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

function LogIn() {

	const navigate = useNavigate();

	const handleLogIn = (e) => {
		e.preventDefault();
		navigate("/dashboard")
	}

	return(
		<div className="relative min-h-screen">

			{/* LOG IN FORM */}
			<div className="absolute inset-0 flex items-center justify-center z-1 px-4">
				<form onSubmit={handleLogIn} className="bg-white flex flex-col p-8 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] w-full max-w-xs sm:max-w-sm">
					<div className="flex items-center justify-center mb-10">
						<img className="w-10 sm:w-13" src="/assets/CvSU-logo.png" alt="Logo"/>
						<p className="font-bold text-xl sm:text-2xl pl-3 text-[#1B651B]">MyKabsupanion</p>
					</div>
					<label className="text-[#A9A9A9] font-bold text-[1rem] my-0" htmlFor="student-number">Student Number</label>
					<input className="border border-gray-300 rounded-md my-2 p-2 w-full outline-none focus:border-green-700" type="text" maxLength={9} id="student-number"/>
					<div className="flex justify-center mt-8">
						<Button type="submit" text="Sign In" BGColor="bg-[#1B651B]" width="w-fit"/>
					</div>
				</form>
			</div>

			{/* LAYA AT DIWA BACKGROUND */}
			<div className="sm:block absolute bottom-0 right-4 md:right-20 lg:right-80 z-0">
				<img className="opacity-50 w-80" src="/assets/Laya-at-Diwa.png" alt="Laya at Diwa"/>
			</div>
		</div>
	);
}

export default LogIn;