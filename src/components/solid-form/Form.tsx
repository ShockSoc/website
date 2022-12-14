import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { createSignal, JSXElement } from "solid-js";
import { firebaseClient } from "../../firebase";
import { LoadingModal } from "../LoadingModal";

type UserInputType = {
  name: string;
  description: string;
  when: string;
  where: string;
  form: string;
  image: File;
};

interface Props {
  databaseFunc: (userInput: UserInputType, url: string | null) => void;
  children: JSXElement;
}

const Form = (props: Props) => {
  const [loading, setLoading] = createSignal<boolean>(false);
  const onSubmit = (ev: SubmitEvent) => {
    ev.preventDefault();
    const formData = new FormData(ev.target as HTMLFormElement);
    const userInput = Object.fromEntries(formData) as UserInputType;
    setLoading(true);

    if (userInput.image.name.length > 0) {
      const storage = getStorage(firebaseClient);
      const imagePath = `events/${userInput.name.toLowerCase()}.webp`;
      const imageRef = ref(storage, imagePath);
      uploadBytes(imageRef, userInput.image)
        .then((_) => {
          getDownloadURL(ref(storage, imagePath))
            .then((url) => props.databaseFunc(userInput, url))
            .catch((err) => {
              alert(`FIREBASE ERROR: ${err}`);
              setLoading(false);
            });
        })
        .catch((err) => {
          alert(`FIREBASE ERROR: ${err}`);
          setLoading(false);
        });
    } else {
      props.databaseFunc(userInput, null);
    }
  };
  return (
    <>
      <form
        onSubmit={onSubmit}
        class="flex flex-col overflow-scroll p-4 border-2 border-slate-900 rounded shadow text-slate-100"
      >
        {props.children}
      </form>
      <LoadingModal loading={loading()} />
    </>
  );
};

export { Form };
