import dynamic from 'next/dynamic';
const Game = dynamic(
  () => import('game/main'),
  { ssr: false }
)

const Play = () => (
  <Game />
);

export default Play;
