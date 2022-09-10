const useInitialFly = () => {
  return (map, initialMapViewport) => {
    setTimeout(() => {
      map.flyTo({
        center: [initialMapViewport.longitude, initialMapViewport.latitude],
        zoom: initialMapViewport.zoom + 1.3,
        duration: 2700,
        pitch: initialMapViewport.pitch + 30,
      });
    }, 500);
  };
};

export default useInitialFly;
