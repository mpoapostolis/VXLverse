import { Html } from '@react-three/drei'

export function Loader() {
  return (
    <Html>
      <div
        className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-primary rounded-full"
        role="status"
        aria-label="loading"
      />
    </Html>
  )
}
