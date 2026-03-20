export default function Stats({ xp, level, streak, totalFocusedTime }) {
  return (
    <>
      <h3>Level:  {level}   XP: {xp}   🔥 Streak: {streak}   Total Hours: {totalFocusedTime}</h3>
    </>
  );
}