import PersonCard from "components/cards/person-card";
import usePeople from "hooks/usePeople";
import { Loader2 } from "lucide-react";
import type { Person } from "types/person";

export default function People() {
  const { data, isFetching } = usePeople();

  return (
    <>
      {isFetching && (
        <Loader2 size={42} className="animate-spin justify-self-center mt-20" />
      )}

      {data && (
        <>
          <div className="flex text-3xl justify-center w-full">
            <span>People</span>
          </div>
          <div className="grid grid-cols-2 gap-6 p-4">
            {data.allPeople &&
              data.allPeople.map((person: Person) => (
                <PersonCard key={person.id} person={person} />
              ))}
          </div>
        </>
      )}
    </>
  );
}
