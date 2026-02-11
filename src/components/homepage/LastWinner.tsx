import {usePreferenceStore} from "../stores/PreferenceStore";

export const LastWinner = () => {
	const {lastWinner} = usePreferenceStore(preferences => preferences);

	return (
		<>
		Last Winner - {lastWinner? lastWinner : "There was none :("}
		</>
	);
};