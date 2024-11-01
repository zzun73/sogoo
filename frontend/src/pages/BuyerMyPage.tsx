import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";

const BuyerMyPage = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-slate-200">
      <div className="my-10 mx-[200px]">
        <h2 className="text-4xl font-shilla font-bold text-center mb-8">마이페이지</h2>
        <div className="min-w-[800px] grid grid-cols-2 gap-4">
          <div className="col-span-2 flex flex-col gap-2">
            {/* 사용자 정보 Title */}
            <div className="flex flex-col gap-8 w-full p-8 rounded-t-3xl bg-white">
              <h3 className="text-xl font-semibold">내 정보</h3>
            </div>
            {/* 사용자 정보 Detail */}
            <div className="flex flex-col gap-8 w-full p-8 rounded-b-3xl bg-white">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center">
                  <p className="w-24 font-bold">성명</p>
                  <p>김싸피</p>
                </div>
                <div className="flex items-center">
                  <p className="w-24 font-bold">휴대폰</p>
                  <p>010-1234-5678</p>
                </div>
                <div className="flex items-center">
                  <p className="w-24 font-bold">이메일</p>
                  <div className="flex-1 w-full">kimSSAFY@ssafy.com</div>
                </div>
                <div className="col-span-3 flex items-center">
                  <p className="w-24 font-bold">주소</p>
                  <div className="flex-1 w-full"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-2">
            {/* 구독 중인 상품 Title */}
            <div className="flex flex-col gap-8 w-full p-8 rounded-t-3xl bg-white">
              <h3 className="text-xl font-semibold">구독 중인 상품</h3>
            </div>
            {/* 구독 중인 상품 List */}
            <div className="flex flex-col gap-8 w-full p-8 rounded-b-3xl bg-white">
              <div className="max-h-[600px] p-1 flex flex-col gap-y-2 overflow-y-auto">
                {/* 단일 카드 영역 */}
                <Card sx={{ width: "100%", minHeight: "150px", boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)" }}>
                  <CardActionArea sx={{ display: "flex" }}>
                    <CardMedia
                      component="img"
                      image="https://plus.unsplash.com/premium_photo-1670513725769-a048102828ad?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="green iguana"
                      sx={{ width: "180px", height: "150px", objectFit: "cover" }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Lizard
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-2">
            {/* 반찬 주문 내역 Title */}
            <div className="flex flex-col gap-8 w-full p-8 rounded-t-3xl bg-white">
              <h3 className="text-xl font-semibold">반찬 주문</h3>
            </div>
            {/* 반찬 주문 내역 List */}
            <div className="flex flex-col gap-8 w-full p-8 rounded-b-3xl bg-white">
              <div className="max-h-[600px] p-1 flex flex-col gap-y-2 overflow-y-auto">
                {/* 단일 카드 영역 */}
                <Card sx={{ width: "100%", minHeight: "150px", boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)" }}>
                  <CardActionArea sx={{ display: "flex" }}>
                    <CardMedia
                      component="img"
                      image="https://plus.unsplash.com/premium_photo-1670513725769-a048102828ad?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="green iguana"
                      sx={{ width: "180px", height: "150px", objectFit: "cover" }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Lizard
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            {/* 리뷰 관리 내역 Title */}
            <div className="flex flex-col gap-8 w-full p-8 rounded-t-3xl bg-white">
              <h3 className="text-xl font-semibold">리뷰 관리</h3>
            </div>
            {/* 구독 중인 상품 List */}
            <div className="flex flex-col gap-8 w-full p-8 rounded-b-3xl bg-white">
              <div>
                <Accordion>
                  <AccordionSummary expandIcon={<Button>리뷰 작성</Button>} aria-controls="panel1-content" id="panel1-header">
                    Accordion 1
                  </AccordionSummary>
                  <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary expandIcon={<Button>리뷰 작성</Button>} aria-controls="panel2-content" id="panel2-header">
                    Accordion 2
                  </AccordionSummary>
                  <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<Button>리뷰 작성</Button>} aria-controls="panel3-content" id="panel3-header">
                    Accordion Actions
                  </AccordionSummary>
                  <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </AccordionDetails>
                  <AccordionActions>
                    <Button>Cancel</Button>
                    <Button>Agree</Button>
                  </AccordionActions>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerMyPage;
