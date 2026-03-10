import {usePreferenceStore} from "../stores/PreferenceStore";

export const LastWinner = () => {
	const {lastWinner} = usePreferenceStore(preferences => preferences);

	return (
		<div className="last-winner-container">
		Last Winner - {lastWinner? lastWinner : "There was none :("}
		</div>
	);
};