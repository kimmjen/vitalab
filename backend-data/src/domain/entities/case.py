from dataclasses import dataclass
from typing import Optional


@dataclass
class Case:
    # 식별자 및 기본 정보
    caseid: int
    subjectid: str

    # 시간 정보
    casestart: int
    caseend: int
    anestart: int
    aneend: int
    opstart: int
    opend: int
    adm: int
    dis: int

    # 환자 기본 정보
    icu_days: int
    death_inhosp: int
    age: int
    sex: str
    height: float
    weight: float
    bmi: float

    # 수술 정보
    asa: int
    emop: int
    department: str
    optype: str
    dx: str
    opname: str
    approach: str
    position: str
    ane_type: str

    # 수술 전 상태
    preop_htn: int
    preop_dm: int
    preop_ecg: Optional[str]
    preop_pft: Optional[str]

    # 수술 전 검사 결과
    preop_hb: Optional[float]
    preop_plt: Optional[int]
    preop_pt: Optional[float]
    preop_aptt: Optional[float]
    preop_na: Optional[float]
    preop_k: Optional[float]
    preop_gluc: Optional[float]
    preop_alb: Optional[float]
    preop_ast: Optional[int]
    preop_alt: Optional[int]
    preop_bun: Optional[int]
    preop_cr: Optional[float]
    preop_ph: Optional[float]
    preop_hco3: Optional[float]
    preop_be: Optional[float]
    preop_pao2: Optional[float]
    preop_paco2: Optional[float]
    preop_sao2: Optional[float]

    # 기도 관리
    cormack: Optional[str]
    airway: Optional[str]
    tubesize: Optional[float]
    dltubesize: Optional[str]
    lmasize: Optional[str]

    # 라인 정보
    iv1: Optional[str]
    iv2: Optional[str]
    aline1: Optional[str]
    aline2: Optional[str]
    cline1: Optional[str]
    cline2: Optional[str]

    # 수술 중 정보
    intraop_ebl: Optional[int]
    intraop_uo: Optional[int]
    intraop_rbc: Optional[int]
    intraop_ffp: Optional[int]
    intraop_crystalloid: Optional[int]
    intraop_colloid: Optional[int]
    intraop_ppf: Optional[int]
    intraop_mdz: Optional[int]
    intraop_ftn: Optional[int]
    intraop_rocu: Optional[int]
    intraop_vecu: Optional[int]
    intraop_eph: Optional[int]
    intraop_phe: Optional[int]
    intraop_epi: Optional[int]
    intraop_ca: Optional[int]