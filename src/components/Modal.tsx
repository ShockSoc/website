import type { JSXElement } from "solid-js";
import { Portal, Show } from "solid-js/web";

interface Props {
  isOpen: boolean;
  children: JSXElement;
  dimensions: string;
  close: () => void;
}

const Modal = (props: Props) => {
  return (
    <Portal>
      <Show when={props.isOpen}>
        <div
          class="fixed top-0 left-0 bottom-0 right-0 bg-slate-900/60"
          onClick={props.close}
        >
          <div
            class={`rounded absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-slate-900 bg-slate-600 p-4 flex flex-col shadow-xl ${props.dimensions}`}
            onClick={(ev) => ev.stopPropagation()}
          >
            {props.children}
          </div>
        </div>
      </Show>
    </Portal>
  );
};

export { Modal };
