import { useCallback, useMemo, useState } from 'react';
import { LayoutChangeEvent, ScrollViewProps } from 'react-native';

/**
 * Hook personalizado para manejar el tamaño del contenido en un ScrollView y determinar si debe tener scroll.
 *
 * @returns {Object} Un objeto con las siguientes propiedades y métodos:
 *   - onContentSizeChange: Función callback para manejar cambios en el tamaño del contenido
 *   - onLayout: Función callback para manejar cambios en el layout del contenedor
 *   - bounces: Boolean que indica si el contenido es más grande que el contenedor (necesita scroll)
 *   - overScrollMode: Modo de scroll ('auto' si hay scroll, 'never' si no lo hay)
 *
 * @example
 * const MyScrollView = () => {
 *   const { onContentSizeChange, onLayout, bounces, overScrollMode } = useScrollContentSize();
 *
 *   return (
 *     <ScrollView
 *       onContentSizeChange={onContentSizeChange}
 *       onLayout={onLayout}
 *       bounces={bounces}
 *       overScrollMode={overScrollMode}
 *     >
 *       { contenido }
 *     </ScrollView>
 *   );
 * };
 */
export const useScrollContentSize = (): Pick<
  ScrollViewProps,
  'onContentSizeChange' | 'onLayout' | 'bounces'
> => {
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const onContentSizeChange = useCallback((_width: number, _height: number) => {
    setContentHeight(_height);
  }, []);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setContainerHeight(height);
  }, []);

  const bounces: boolean = useMemo(
    () => contentHeight >= containerHeight,
    [containerHeight, contentHeight]
  );

  return {
    onContentSizeChange,
    onLayout,
    bounces,
  };
};
