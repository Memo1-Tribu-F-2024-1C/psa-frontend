export default function IsLeaderNull({ lider }: { lider: any }) {
  if (lider === null) { return (<>   </>) } else {
    return (
      <>{lider['nombre'] + " " + lider['apellido']}</>
    )
  }
}