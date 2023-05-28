# 3D Minesweeper
โปรเจคนี้เป็นการนำเกม **Minesweeper** ซึ่งเป็นเกมคอมพิวเตอร์ตั้งแต่ช่วงยุค 90's มาต่อยอดโดยการนำมาสร้างในรูปแบบสามมิติ และทำเป็น web-based game

## ภาษาและไลบรารีที่ใช้

- Javascript
- Three.js
- React
- React Three Fiber
- React Three Deri
-  React Spring

# วิธีการเล่น

**[คลิกที่นี่เพื่อเข้าเกม](https://3d-minesweeper-three.vercel.app/)**

![](https://cdn.discordapp.com/attachments/1052177373136695307/1112469140297486467/image.png)

**หน้าต่างในเกมนี้จะประกอบไปด้วย**
1) หน้าปรับระดับความยาก โดยจะประกอบไปด้วย 3 ขั้น ได้แก่
	- Beginner (ขนาด 5 x 5 x 5)
	- Intermediate (ขนาด 7 x 7 x 7)
	- Expert (ขนาด 9 x 9 x 9)

2) จำนวนธงที่สามารถปักได้ โดยจะมีจำนวนเท่ากับจำนวนระเบิดในระดับความยากนั้น
3) ปุ่มรีเซต สามารถกดเพื่อเริ่มเกมใหม่ในระดับความยากนั้นได้
4) เวลา โดยจะเริ่มนับทันทีที่กดปุ่มบนลูกบาศก์
5) หน้าต่างเกม โดยจะสามารถซูมเข้าออกและหมุนได้ 

## การควบคุม

เกมนี้สร้างมาเพื่อเล่นด้วยเมาส์เป็นหลัก โดย
- เลื่อนลูกกลิ้งเพื่อซูมเข้าซูมออก
- คลิกซ้ายและลากเพื่อหมุน
- คลิกซ้ายบนปุ่มเพื่อเปิด ถ้ากดบนปุ่มที่เป็นระเบิดก็จะถือว่าจบเกม
- คลิกขวาเพื่อปักธงว่าเป็นระเบิด โดยจะสามารถกดได้เฉพาะปุ่มที่ยังไม่เปิดเท่านั้น
## การจบเกม

![](https://cdn.discordapp.com/attachments/1052177373136695307/1112474503021350922/image.png)

โดยเมื่อกดปุ่ม ถ้าปุ่มนั้นไม่ได้เป็นระเบิดจะทำการแสดงเลข โดยที่เลขนั้นจะแสดงถึงจำนวนระเบิดที่อยู่รอบๆ เช่น เลขสองจะนับบริเวณสีเหลืองรอบๆ โดยที่จะนับจุดที่อยู่คนละด้านด้วย

![](https://cdn.discordapp.com/attachments/1052177373136695307/1112478052740509797/image.png)

เมื่อกดโดนระเบิดก็จะถือว่าแพ้และจบเกม แล้วเกมจะทำการโชว์ตำแหน่งของระเบิดทั้งหมดและหยุดเวลาไว้
โดยสามารถเริ่มใหม่โดยการกดปุ่ม icon ที่กลางจอ

![](https://cdn.discordapp.com/attachments/1052177373136695307/1112480527744766075/image.png)

เมื่อเปิดทุกจุดที่ไม่ใช่ระเบิดได้หมดก็จะถือว่าชนะเกม แล้วเวลาก็จะถูกหยุดไว้

