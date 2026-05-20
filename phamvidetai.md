
Trong bối cảnh chuyển đổi số diễn ra mạnh mẽ, nhu cầu xây dựng và vận hành hệ thống công nghệ thông tin ngày càng tăng cao. 
Điện toán đám mây (Cloud Computing) trở thành xu hướng phổ biến nhờ khả năng mở rộng linh hoạt, tối ưu chi phí và hỗ trợ triển khai dịch vụ nhanh chóng. 
Tuy nhiên, việc quản lý và triển khai hạ tầng theo phương pháp thủ công thường dễ phát sinh sai sót cấu hình, khó kiểm soát phiên bản và gây khó khăn khi mở rộng hệ thống.
Để giải quyết các vấn đề trên, mô hình Infrastructure as Code (IaC) ra đời nhằm tự động hóa việc xây dựng và quản lý hạ tầng thông qua mã nguồn. 
IaC giúp chuẩn hóa quy trình triển khai, nâng cao tính đồng nhất giữa các môi trường và hỗ trợ quản lý hạ tầng hiệu quả hơn.
Tính cấp thiết của đề tài
Việc nghiên cứu và áp dụng Infrastructure as Code có ý nghĩa quan trọng trong quá trình hiện đại hóa hạ tầng công nghệ thông tin. 
Phương pháp này giúp giảm thiểu lỗi phát sinh do cấu hình thủ công, tăng tính nhất quán giữa các hệ thống và rút ngắn thời gian triển khai dịch vụ.
Bên cạnh đó, IaC còn hỗ trợ doanh nghiệp dễ dàng mở rộng hạ tầng khi nhu cầu sử dụng tăng cao, đồng thời nâng cao khả năng quản lý, bảo trì và tự động hóa hệ thống Cloud trong thực tế.
Mục tiêu nghiên cứu
Đề tài hướng đến việc nghiên cứu mô hình Infrastructure as Code (IaC) và ứng dụng công cụ Terraform trong quá trình triển khai, quản lý hạ tầng Cloud. 
Thông qua việc tự động hóa các tác vụ cấu hình và vận hành hệ thống, đề tài nhằm giảm thiểu sai sót phát sinh khi triển khai thủ công, đồng thời nâng cao tính đồng nhất giữa các môi trường hoạt động. 
Bên cạnh đó, nghiên cứu còn tập trung xây dựng quy trình quản lý hạ tầng bằng mã nguồn nhằm tăng tính ổn định, khả năng mở rộng và hiệu quả vận hành hệ thống trong môi trường điện toán đám mây.


Phạm vi đề tài
Do thời gian có hạn nên đề tài chỉ tập trung áp dụng mô hình Infrastructure as Code (IaC) để tự động hóa việc triển khai hạ tầng Cloud bằng công cụ Terraform. 
Nội dung nghiên cứu bao gồm việc xây dựng, cấu hình và vận hành các tài nguyên cơ bản trên nền tảng Cloud, triển khai hạ tầng thông qua mã nguồn thay cho phương pháp cấu hình thủ công truyền thống. 
Đề tài chủ yếu nghiên cứu về triển khai hạ tầng, không đi sâu vào phát triển ứng dụng hay các kỹ thuật lập trình nâng cao khác.
So sánh các công cụ IaC
Trong lĩnh vực Infrastructure as Code (IaC), Terraform, Ansible và CloudFormation là ba công cụ phổ biến được sử dụng để tự động hóa việc triển khai và quản lý hệ thống. Mỗi công cụ có mục đích, cách tiếp cận và phạm vi sử dụng khác nhau tùy theo nhu cầu của doanh nghiệp và môi trường triển khai.
Terraform là công cụ chủ yếu dùng để quản lý hạ tầng và triển khai tài nguyên Cloud.
Trong khi đó, Ansible tập trung nhiều hơn vào cấu hình phần mềm và tự động hóa quản trị hệ thống.
CloudFormation là công cụ do AWS phát triển nhằm quản lý và triển khai hạ tầng trên nền tảng AWS. Tuy nhiên, công cụ này chỉ hoạt động trong hệ sinh thái AWS nên không hỗ trợ multi-cloud.
So sánh Declarative và Procedural
Declarative là phương pháp mô tả trạng thái mong muốn của hệ thống, người dùng chỉ cần khai báo “muốn hệ thống đạt trạng thái như thế nào”, còn công cụ sẽ tự động thực hiện các bước cần thiết để đạt được trạng thái đó.
Procedural là phương pháp yêu cầu người dùng mô tả chi tiết từng bước thực hiện theo trình tự cụ thể để đạt được kết quả mong muốn.
Declarative tập trung vào “kết quả mong muốn”, còn Procedural tập trung vào “cách thực hiện”. Trong thực tế, Terraform thường được dùng theo hướng Declarative để quản lý hạ tầng, còn Ansible sử dụng Procedural nhằm tự động hóa cấu hình và vận hành hệ thống.
