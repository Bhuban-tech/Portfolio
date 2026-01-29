// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';

// export const CustomCursor = () => {
//     const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//     useEffect(() => {
//         const updateMousePosition = (e: MouseEvent) => {
//             setMousePosition({ x: e.clientX, y: e.clientY });
//         };

//         window.addEventListener('mousemove', updateMousePosition);

//         return () => {
//             window.removeEventListener('mousemove', updateMousePosition);
//         };
//     }, []);

//     return (
//         <motion.div
//             className="fixed top-0 left-0 w-8 h-8 border border-accent rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block" // Hidden on mobile
//             animate={{
//                 x: mousePosition.x - 16,
//                 y: mousePosition.y - 16,
//             }}
//             transition={{
//                 type: 'spring',
//                 damping: 20,
//                 stiffness: 300,
//                 mass: 0.5,
//             }}
//         >
//             <div className="w-2 h-2 bg-accent rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-[2px]" />
//         </motion.div>
//     );
// };
