import { useEffect } from 'react';
import { getModalHierarchy } from 'utils';

export const useOnClickOutside = (

  ref: { current: any },
  handler: ({ event: { } }) => void,
  uniqueId?: string

) => {

  useEffect(
    () => {

      const listener = (!uniqueId || (uniqueId && getModalHierarchy(uniqueId || "").hierarchy === 0)) ? (event: any) => {
        let insideClick = false;
        let refList = [];

        if (Array.isArray(ref)) {
          refList = ref;
        } else {
          refList = [ref];
        }

        const isToast = String(event?.target?.parentElement?.classList).includes("toast");

        // || event.target?.parentElement.id === uniqueId

        if (isToast ) {
          return;
        }

        refList.forEach(specificRef => {
          if (specificRef && specificRef.current && specificRef.current.contains(event.target)) {
            insideClick = true;
          }
        });

        if (insideClick) {
          // Do nothing if clicking ref's element or descendent elements
          return;
        }

        handler(event);
      } : () => null;

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler, uniqueId],
  );
};

