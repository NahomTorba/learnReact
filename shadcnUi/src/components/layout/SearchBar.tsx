import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Search } from "lucide-react"

export default function SearchBar(props: React.ComponentProps<"input">) {
  return (
    <div className="w-full flex justify-center mt-6">
      <InputGroup className="w-full max-w-md">
        <InputGroupAddon>
          <Search className="h-4 w-4" />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search..." {...props} />
      </InputGroup>
    </div>
  )
}
