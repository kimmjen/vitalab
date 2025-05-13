from fastapi import APIRouter
from .cases import router as cases_router
from .tracks import router as tracks_router
from .labs import router as labs_router

router = APIRouter()
router.include_router(cases_router)
router.include_router(tracks_router)
router.include_router(labs_router)